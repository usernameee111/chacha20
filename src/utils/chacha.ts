/**
 * Minimal ChaCha20 implementation that also returns step-by-step trace data
 * for visualization. This implementation follows RFC 7539 ChaCha20 operations.
 */

export type Word = number; // 32-bit unsigned

function rotl(a:number, b:number) {
  return ((a << b) | (a >>> (32 - b))) >>> 0;
}

export function quarterRound(a:number,b:number,c:number,d:number) {
  // returns new [a,b,c,d]
  a = (a + b) >>> 0; d = rotl(d ^ a, 16);
  c = (c + d) >>> 0; b = rotl(b ^ c, 12);
  a = (a + b) >>> 0; d = rotl(d ^ a, 8);
  c = (c + d) >>> 0; b = rotl(b ^ c, 7);
  return [a,b,c,d] as [number,number,number,number];
}

/**
 * Given a 16-word state (array of 32-bit words), perform one "column" then "diagonal"
 * round pair (i.e., 2 rounds) as ChaCha20 does in each double-round. We'll expose steps.
 */

export type TraceStep = {
  type: 'quarter'|'add'|'xor'|'rotate'|'round'|'state'|'keystream'|'final',
  desc?: string,
  indices?: number[],
  before?: number[],
  after?: number[]
};

export function stateToHexWords(state:number[]) {
  return state.map(w => '0x' + (w>>>0).toString(16).padStart(8,'0'));
}

export function chacha20Block(stateInput:number[]) : { state:number[], trace:TraceStep[] } {
  // stateInput: 16 words
  const trace: TraceStep[] = [];
  const working = stateInput.slice();
  trace.push({type:'state', desc:'Initial state', before: working.slice()});
  // 20 rounds = 10 double rounds
  for (let r=0;r<10;r++) {
    // column rounds (quarter rounds on columns)
    // indices: (0,4,8,12), (1,5,9,13), (2,6,10,14), (3,7,11,15)
    const cols = [[0,4,8,12],[1,5,9,13],[2,6,10,14],[3,7,11,15]];
    for (const idxs of cols) {
      trace.push({type:'quarter', desc:`Quarter round (column) indices ${idxs.join(',')}`, indices: idxs, before: working.slice()});
      const [a,b,c,d] = quarterRound(working[idxs[0]],working[idxs[1]],working[idxs[2]],working[idxs[3]]);
      working[idxs[0]] = a; working[idxs[1]] = b; working[idxs[2]] = c; working[idxs[3]] = d;
      trace.push({type:'state', desc:'After quarter round', indices: idxs, after: working.slice()});
    }
    // diagonal rounds
    const diags = [[0,5,10,15],[1,6,11,12],[2,7,8,13],[3,4,9,14]];
    for (const idxs of diags) {
      trace.push({type:'quarter', desc:`Quarter round (diagonal) indices ${idxs.join(',')}`, indices: idxs, before: working.slice()});
      const [a,b,c,d] = quarterRound(working[idxs[0]],working[idxs[1]],working[idxs[2]],working[idxs[3]]);
      working[idxs[0]] = a; working[idxs[1]] = b; working[idxs[2]] = c; working[idxs[3]] = d;
      trace.push({type:'state', desc:'After quarter round', indices: idxs, after: working.slice()});
    }
    trace.push({type:'round', desc:`Double round ${r+1} complete`, before: undefined, after: working.slice()});
  }
  // add original state
  const finalState = new Array(16);
  for (let i=0;i<16;i++) finalState[i] = (working[i] + stateInput[i]) >>> 0;
  trace.push({type:'final', desc:'Add original state to working state', before: stateInput.slice(), after: finalState.slice()});
  return { state: finalState, trace };
}

/**
 * Utility: build initial ChaCha20 state from key(32 bytes), counter, nonce(12 bytes).
 * Returns 16 words.
 */
export function buildState(keyBytes: Uint8Array, counter:number, nonceBytes: Uint8Array) {
  if (keyBytes.length !== 32) throw new Error('key must be 32 bytes');
  if (nonceBytes.length !== 12) throw new Error('nonce must be 12 bytes');
  const constants = new Uint8Array([101,120,112,97,110,100,32,51,50,45,98,121,116,101,115,32]); // "expand 32-bytes "
  function readLE(b:Uint8Array, off:number) {
    return (b[off] | (b[off+1]<<8) | (b[off+2]<<16) | (b[off+3]<<24)) >>> 0;
  }
  const state = new Array(16).fill(0).map(()=>0);
  state[0] = readLE(constants,0);
  state[1] = readLE(constants,4);
  state[2] = readLE(constants,8);
  state[3] = readLE(constants,12);
  for (let i=0;i<8;i++) state[4+i] = readLE(keyBytes, i*4);
  state[12] = counter >>> 0;
  state[13] = readLE(nonceBytes,0);
  state[14] = readLE(nonceBytes,4);
  state[15] = readLE(nonceBytes,8);
  return state;
}
