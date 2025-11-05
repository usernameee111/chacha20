import React from 'react';
import NavBar from './components/NavBar';
import ChaChaVisualizer from './components/ChaChaVisualizer';
import TryPanel from './components/TryPanel';
import About from './components/About';
import Team from './components/Team';

export default function App(){
  return (
    <div>
      <NavBar />
      <main className="container" style={{paddingTop:96}}>
        <section id="home" className="section">
          <div style={{display:'flex',alignItems:'center',gap:24,flexWrap:'wrap'}}>
            <div style={{flex:1}}>
              <h1 className="hero-title">ChaCha20 Encryption — Ultra Visual</h1>
              <p className="hero-sub">Fast. Streamlined. Unbreakable. — Visualized step-by-step with neon cyber style.</p>
            </div>
            <div style={{width:260}}>
              <div className="panel">
                <div style={{fontSize:13,color:'var(--muted)'}}>Quick actions</div>
                <div style={{display:'flex',gap:8,marginTop:10}}>
                  <a href="#algorithm" className="btn">Explore Algorithm</a>
                  <a href="#try" className="btn ghost">Try It</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="algorithm" className="section">
          <h2 style={{marginBottom:12}}>How it works — Visual Demo</h2>
          <ChaChaVisualizer />
        </section>

        <section id="try" className="section">
          <h2 style={{marginBottom:12}}>Try Encryption / Decryption</h2>
          <TryPanel />
        </section>

        <section id="about" className="section">
          <h2 style={{marginBottom:12}}>About</h2>
          <About />
        </section>

        <section id="team" className="section">
          <h2 style={{marginBottom:12}}>Team</h2>
          <Team />
        </section>
      </main>
      <footer className="footer">Made with ❤️ — ChaCha20 Visual</footer>
    </div>
  );
}
