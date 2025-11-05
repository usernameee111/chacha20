import React from 'react';

export default function NavBar(){
  return (
    <header className="header">
      <div className="inner">
        <div style={{display:'flex',alignItems:'center',gap:12}}>
          <div className="logo-badge">Ch20</div>
          <div>
            <div style={{fontWeight:800}}>ChaCha20 Ultra</div>
            <div style={{fontSize:12,color:'var(--muted)'}}>Interactive encryption simulation</div>
          </div>
        </div>
        <nav className="nav-links" aria-label="main navigation">
          <a href="#home">Home</a>
          <a href="#algorithm">Algorithm</a>
          <a href="#try">Try</a>
          <a href="#about">About</a>
          <a href="#team">Team</a>
        </nav>
      </div>
    </header>
  );
}
