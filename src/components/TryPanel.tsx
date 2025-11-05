import React, { useState } from 'react';
import { buildState, chacha20Block } from '../utils/chacha';
function textToBytes(text:string){ return new TextEncoder().encode(text); }
function xorBytes(a:Uint8Array, b:Uint8Array){ const out=new Uint8Array(a.length); for(let i=0;i<a.length;i++) out[i]=a[i]^b[i% b.length]; return out; }
function bytesToHex(b:Uint8Array){ return Array.from(b).map(x=> x.toString(16).padStart(2,'0')).join(''); }

export default function TryPanel(){
  const [text,setText] = useState('Hello ChaCha20!');
  const [keyHex,setKeyHex] = useState('000102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f');
  const [nonceHex,setNonceHex] = useState('000000000000000001000002');
  const [counter,setCounter] = useState(1);
  const [outHex,setOutHex] = useState('');

  function hexToBytes(h:string){
    const s=h.replace(/[^0-9a-f]/ig,'');
    const arr=new Uint8Array(s.length/2);
    for(let i=0;i<arr.length;i++) arr[i]=parseInt(s.substr(i*2,2),16);
    return arr;
  }

  function onEncrypt(){
    try{
      const key = hexToBytes(keyHex);
      const nonce = hexToBytes(nonceHex);
      if(key.length!==32 || nonce.length!==12){ alert('Key must be 32 bytes (64 hex chars) and nonce 12 bytes (24 hex chars)'); return; }
      const state = buildState(key,counter,nonce);
      const { state: final } = chacha20Block(state);
      const ks = new Uint8Array(64);
      for(let i=0;i<16;i++){
        const w = final[i] >>> 0;
        ks[i*4+0] = (w & 0xff);
        ks[i*4+1] = (w >>> 8) & 0xff;
        ks[i*4+2] = (w >>> 16) & 0xff;
        ks[i*4+3] = (w >>> 24) & 0xff;
      }
      const b = textToBytes(text);
      const out = xorBytes(b, ks);
      setOutHex(bytesToHex(out));
      try{ const ctx = new (window.AudioContext || (window as any).webkitAudioContext)(); const o=ctx.createOscillator(); const g=ctx.createGain(); o.type='sine'; o.frequency.value=480; o.connect(g); g.connect(ctx.destination); g.gain.value=0.0001; g.gain.exponentialRampToValueAtTime(0.08,ctx.currentTime+0.01); o.start(); g.gain.exponentialRampToValueAtTime(0.0001,ctx.currentTime+0.18); o.stop(ctx.currentTime+0.2);}catch(e){};
    }catch(e){ alert('Error: '+e.message); }
  }

  return (
    <div className="panel">
      <div style={{display:'grid',gridTemplateColumns:'1fr 360px',gap:16}}>
        <div>
          <label style={{fontSize:13,color:'var(--muted)'}}>Input Text</label>
          <textarea value={text} onChange={(e)=>setText(e.target.value)} style={{width:'100%',minHeight:120,marginTop:8,padding:10,borderRadius:8,background:'#081226',color:'white',border:'1px solid rgba(255,255,255,0.03)'}} />
          <div style={{display:'flex',gap:8,marginTop:10}}>
            <input value={keyHex} onChange={(e)=>setKeyHex(e.target.value)} style={{flex:1,padding:8,borderRadius:8,background:'#071226',border:'1px solid rgba(255,255,255,0.03)',color:'white'}} />
            <input value={nonceHex} onChange={(e)=>setNonceHex(e.target.value)} style={{width:200,padding:8,borderRadius:8,background:'#071226',border:'1px solid rgba(255,255,255,0.03)',color:'white'}} />
          </div>
          <div style={{marginTop:12,display:'flex',gap:8}}>
            <button className="btn" onClick={()=>onEncrypt()}>Encrypt</button>
            <button className="btn ghost" onClick={()=>{ setOutHex(''); }}>Clear</button>
          </div>
        </div>
        <div>
          <div style={{fontSize:13,color:'var(--muted)'}}>Output (hex)</div>
          <div style={{marginTop:8,minHeight:120,padding:12,borderRadius:8,background:'#071226',color:'#9fd8cf',fontFamily:'JetBrains Mono, monospace',fontSize:13}}>
            {outHex || <span style={{color:'var(--muted)'}}>No output yet — press Encrypt</span>}
          </div>
        </div>
      </div>
    </div>
  );
}
