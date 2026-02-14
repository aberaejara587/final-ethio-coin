import React, { useState, useEffect } from 'react';

function App() {
  const [balance, setBalance] = useState(0);
  const [tab, setTab] = useState('home');
  const [level, setLevel] = useState(1);
  const [tapValue, setTapValue] = useState(1); // Upgrade level

  // Level up logic
  useEffect(() => {
    const nextLevelReq = level * 1000;
    if (balance >= nextLevelReq) {
      setLevel(level + 1);
      alert(`Baga gammadde! Level ${level + 1} geesseetta!`);
    }
  }, [balance, level]);

  const botLink = "https://t.me/LINKII_BOT_KEE"; 
  const inviteLink = `https://t.me/share/url?url=${encodeURIComponent(botLink)}&text=${encodeURIComponent("Koottuu Ethio Coin waliin taphannaa! 🪙")}`;

  return (
    <div style={{ textAlign: 'center', fontFamily: 'Arial', padding: '20px', color: 'white', backgroundColor: '#111', minHeight: '100vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <span>Level: {level}</span>
        <span>Tap Power: {tapValue}</span>
      </div>

      <h1>Ethio Coin</h1>
      
      {tab === 'home' && (
        <div>
          <div style={{ fontSize: '50px', margin: '20px' }}>🪙 {balance}</div>
          <button 
            onClick={() => setBalance(balance + tapValue)}
            style={{ padding: '30px', borderRadius: '50%', fontSize: '20px', backgroundColor: '#f1c40f', border: 'none', boxShadow: '0 0 20px #f1c40f' }}
          >
            TAP!
          </button>
        </div>
      )}

      {tab === 'tasks' && (
        <div>
          <h2>Daily Tasks</h2>
          <div style={{ background: '#222', padding: '15px', borderRadius: '10px', margin: '10px 0' }}>
            <p>Subscribe to our Channel</p>
            <button onClick={() => setBalance(balance + 500)} style={{ background: '#27ae60', color: 'white', border: 'none', padding: '10px' }}>Claim +500</button>
          </div>
        </div>
      )}

      {tab === 'upgrade' && (
        <div>
          <h2>Upgrades</h2>
          <div style={{ background: '#222', padding: '15px', borderRadius: '10px' }}>
            <p>Upgrade Tap Value (Cost: {tapValue * 500})</p>
            <button 
              onClick={() => {
                if (balance >= tapValue * 500) {
                  setBalance(balance - tapValue * 500);
                  setTapValue(tapValue + 1);
                } else {
                  alert("Koiniin kee hin ga'u!");
                }
              }}
              style={{ background: '#e67e22', color: 'white', border: 'none', padding: '10px' }}
            >
              Upgrade
            </button>
          </div>
        </div>
      )}

      {tab === 'invite' && (
        <div style={{ marginTop: '30px' }}>
          <h2>Invite Friends</h2>
          <a href={inviteLink} style={{ padding: '15px 30px', backgroundColor: '#3498db', color: 'white', textDecoration: 'none', borderRadius: '10px' }}>Invite a Friend 🚀</a>
        </div>
      )}

      {/* Navigation */}
      <div style={{ position: 'fixed', bottom: 0, left: 0, width: '100%', display: 'flex', background: '#222', padding: '15px 0' }}>
        <button onClick={() => setTab('home')} style={{ flex: 1, color: 'white', background: 'none', border: 'none' }}>Home</button>
        <button onClick={() => setTab('tasks')} style={{ flex: 1, color: 'white', background: 'none', border: 'none' }}>Tasks</button>
        <button onClick={() => setTab('upgrade')} style={{ flex: 1, color: 'white', background: 'none', border: 'none' }}>Upgrade</button>
        <button onClick={() => setTab('invite')} style={{ flex: 1, color: 'white', background: 'none', border: 'none' }}>Invite</button>
      </div>
    </div>
  );
}

export default App;