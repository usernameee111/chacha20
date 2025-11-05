import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, OrbitControls } from '@react-three/drei';
import gsap from 'gsap';
import { buildState, chacha20Block, stateToHexWords, TraceStep } from '../utils/chacha';
function Cube({ value, highlight, id}:{value:string, highlight:boolean, id:number}){
  const ref = useRef<any>();
  useFrame(()=>{
    if(ref.current) ref.current.rotation.y += 0.006 + (highlight?0.02:0);
  });
  return (
    <group>
      <mesh ref={ref}>
        <boxGeometry args={[0.92,0.92,0.22]} />
        <meshStandardMaterial emissive={highlight? 'cyan' : undefined} color={highlight? '#00ffd6' : '#071226'} metalness={0.2} roughness={0.7} />
      </mesh>
      <Html position={[0,-0.65,0]}>
        <div style={{color:'white',fontFamily:'JetBrains Mono, monospace',fontSize:12,textAlign:'center'}}>
          <div style={{fontSize:11,color:'#a7b6c9'}}>#{id}</div>
          <div style={{marginTop:4}}>{value}</div>
        </div>
      </Html>
    </group>
  );
}

export default function ChaChaVisualizer(){
  const defaultKey = useMemo(()=> new Uint8Array(32).map((_,i)=> (i+1)&0xff),[]);
  const defaultNonce = useMemo(()=> new Uint8Array([0,0,0,0,0,0,0,0,0,0,0,1]),[]);
  const [counter, setCounter] = useState(1);
  const [trace, setTrace] = useState<TraceStep[]>([]);
  const [displayState, setDisplayState] = useState<string[]>([]);
  const [running, setRunning] = useState(false);
  const [highlightIdx, setHighlightIdx] = useState<number|null>(null);

  useEffect(()=>{
    const st = buildState(defaultKey, counter, defaultNonce);
    const hex = stateToHexWords(st);
    setDisplayState(hex);
  },[counter,defaultKey,defaultNonce]);

  function playSound(freq=420,dur=0.08){
    try{
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = 'sine'; o.frequency.value = freq;
      g.gain.value = 0.0001;
      o.connect(g); g.connect(ctx.destination);
      g.gain.exponentialRampToValueAtTime(0.12, ctx.currentTime+0.01);
      o.start();
      g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime+dur);
      o.stop(ctx.currentTime+dur+0.02);
    }catch(e){}
  }

  async function runSimulation(){
    setRunning(true);
    setTrace([]);
    const state = buildState(defaultKey, counter, defaultNonce);
    const { state: final, trace: t } = chacha20Block(state);
    for(const step of t){
      if(step.type === 'state' && step.indices){
        const before = step.before ?? [];
        const after = step.after ?? [];
        setDisplayState(before.map(w=> '0x'+(w>>>0).toString(16).padStart(8,'0')));
        setHighlightIdx(null);
        playSound(360,0.05);
        await new Promise(r=>setTimeout(r,350));
        for(const idx of step.indices){
          setHighlightIdx(idx);
          playSound(480+ (idx%6)*30,0.07);
          await new Promise(r=>setTimeout(r,180));
        }
        setDisplayState(after.map(w=> '0x'+(w>>>0).toString(16).padStart(8,'0')));
        await new Promise(r=>setTimeout(r,300));
        setHighlightIdx(null);
      } else {
        playSound(300,0.04);
        await new Promise(r=>setTimeout(r,220));
      }
    }
    setDisplayState(final.map(w=>'0x'+(w>>>0).toString(16).padStart(8,'0')));
    playSound(680,0.14);
    setRunning(false);
  }

  const positions = useMemo(()=>{ const p:[number,number,number][] = []; for(let r=0;r<4;r++) for(let c=0;c<4;c++) p.push([c*1.35,-r*1.35,0]); return p; },[]);

  return (
    <div className="panel">
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}>
        <div style={{display:'flex',gap:8}}>
          <button className="btn" onClick={()=> runSimulation()} disabled={running}>Run 20-round Simulation</button>
          <button className="btn ghost" onClick={()=> { setHighlightIdx(null); setTrace([]); const st=buildState(defaultKey,counter,defaultNonce); setDisplayState(stateToHexWords(st)); }}>Reset</button>
        </div>
        <div style={{color:'var(--muted)'}}>Counter: <input type="number" value={counter} onChange={(e:any)=> setCounter(Number(e.target.value))} style={{width:80,marginLeft:8}} /></div>
      </div>

      <div style={{display:'flex',gap:16,alignItems:'flex-start'}}>
        <div style={{width:'66%'}}>
          <div style={{width:'100%',height: '64vh', borderRadius:8, overflow:'hidden'}}>
            <Canvas camera={{position:[0,0,10], fov:55}}>
              <ambientLight intensity={0.6} />
              <directionalLight position={[5,5,5]} intensity={0.9} />
              <group position={[-1.95,1.95,0]}>
                {displayState.map((v,idx)=> (
                  <mesh key={idx} position={positions[idx]}>
                    <Cube value={v} highlight={highlightIdx===idx} id={idx} />
                  </mesh>
                ))}
              </group>
              <OrbitControls enablePan={false} enableZoom={false} autoRotate={false} />
            </Canvas>
          </div>
        </div>
        <div style={{width:'34%'}}>
          <div className="panel" style={{marginBottom:12}}>
            <div style={{fontWeight:700}}>Trace Controls</div>
            <div style={{marginTop:8,color:'var(--muted)'}}>The simulation visualizes each quarter-round and shows which words change.</div>
            <div style={{marginTop:8}}><button className="btn" onClick={()=> runSimulation()} disabled={running}>Play</button></div>
          </div>
          <div className="panel">
            <div style={{fontWeight:700}}>Current State (hex)</div>
            <div style={{marginTop:8,fontFamily:'JetBrains Mono, monospace',fontSize:13}}>
              {displayState.map((w,i)=> <div key={i} style={{padding:'6px 0', borderBottom:'1px dashed rgba(255,255,255,0.02)'}}><strong>#{i}</strong> &nbsp; {w}</div>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
