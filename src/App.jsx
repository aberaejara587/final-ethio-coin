import React, { useState } from 'react';

function App() {
  const [balance, setBalance] = useState(0);
  const [tab, setTab] = useState('home');

  // Linkii affeerraa (Replace with your bot link)
  const botLink = "https://t.me/LINKII_BOT_KEE"; 
  const inviteLink = `https://t.me/share/url?url=${encodeURIComponent(botLink)}&text=${encodeURIComponent("Koottuu Ethio Coin waliin taphannaa! 🪙")}`;

  return (
    <div style={{ textAlign: 'center', fontFamily: 'Arial', padding: '20px', color: 'white' }}>
      <h1>Ethio Coin</h1>
      
      {tab === 'home' && (
        <div>
          <div style={{ fontSize: '40px', margin: '20px' }}>🪙 {balance}</div>
          <button 
            onClick={() => setBalance(balance + 1)}
            style={{ padding: '20px', borderRadius: '50%', fontSize: '20px', backgroundColor: '#f1c40f', border: 'none', cursor: 'pointer' }}
          >
            TAP!
          </button>
        </div>
      )}

      {tab === 'invite' && (
        <div style={{ marginTop: '50px' }}>
          <h2>Invite Friends</h2>
          <p>Hiriyoota kee affeeruun koinii dabalataa argadhu!</p>
          <a 
            href={inviteLink} 
            target="_blank" 
            rel="noreferrer"
            style={{ 
              display: 'inline-block', 
              padding: '15px 30px', 
              backgroundColor: '#3498db', 
              color: 'white', 
              textDecoration: 'none', 
              borderRadius: '10px',
              fontWeight: 'bold',
              marginTop: '20px'
            }}
          >
            Invite a Friend 🚀
          </a>
        </div>
      )}

      {/* Navigation Bar */}
      <div style={{ position: 'fixed', bottom: 0, left: 0, width: '100%', display: 'flex', background: '#222', padding: '10px 0' }}>
        <button onClick={() => setTab('home')} style={{ flex: 1, color: 'white', background: 'none', border: 'none' }}>Home</button>
        <button onClick={() => setTab('invite')} style={{ flex: 1, color: 'white', background: 'none', border: 'none' }}>Invite</button>
      </div>
    </div>
  );
}

export default App;