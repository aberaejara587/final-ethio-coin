import React, { useState, useEffect } from 'react';

function App() {
  const [balance, setBalance] = useState(0);
  const [tab, setTab] = useState('home');
  const [level, setLevel] = useState(1);
  const [tapValue, setTapValue] = useState(1);
  const [user, setUser] = useState({ first_name: "TapPlayer", username: "Guest" });

  // 1. Telegram User Data & Vibration
  
  useEffect(() => {
  const tg = window.Telegram?.WebApp;
  if (tg) {
    tg.ready();
    tg.expand();
    const userData = tg.initDataUnsafe?.user;
    if (userData) {
      setUser({
        first_name: userData.first_name,
        username: userData.username || "Guest"
      });
    }
  }
}, []);

  const handleTap = () => {
    setBalance(prev => prev + tapValue);
    // 2. Vibration Effect
    if (window.Telegram?.WebApp?.HapticFeedback) {
      window.Telegram.WebApp.HapticFeedback.impactOccurred('light');
    }
  };

  // 3. Daily Reward Logic
  const claimDaily = () => {
    const lastClaim = localStorage.getItem('lastClaim');
    const today = new Date().toDateString();
    if (lastClaim !== today) {
      setBalance(prev => prev + 1000);
      localStorage.setItem('lastClaim', today);
      alert("Baga gammadde! Daily Reward +1000 fudhatteetta.");
    } else {
      alert("Har'aaf fudhatteetta, bor deebi'i!");
    }
  };

  const botLink = "https://t.me/aberaejara587_bot"; // Linkii bot keetiin bakka buusi

  return (
    <div style={{ textAlign: 'center', fontFamily: 'Arial', padding: '20px', color: 'white', backgroundColor: '#000', minHeight: '100vh' }}>
      {/* Header with User Info */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#222', padding: '10px', borderRadius: '15px' }}>
        <span>👤 {user.first_name}</span>
        <span style={{ color: '#f1c40f' }}>Lv. {level}</span>
      </div>

      {tab === 'home' && (
        <div style={{ marginTop: '40px' }}>
          <div style={{ fontSize: '50px', fontWeight: 'bold' }}>🪙 {balance}</div>
          <p style={{ color: '#aaa' }}>Tap Power: {tapValue}</p>
          <button 
            onClick={handleTap}
            style={{ 
              marginTop: '20px', padding: '40px', borderRadius: '50%', fontSize: '25px', 
              backgroundColor: '#f1c40f', border: '8px solid #d4ac0d', cursor: 'pointer',
              boxShadow: '0 0 30px rgba(241, 196, 15, 0.5)'
            }}
          >
            TAP!
          </button>
        </div>
      )}

      {/* 4. Leaderboard & Tasks Tab Combined */}
      {tab === 'tasks' && (
        <div style={{ textAlign: 'left' }}>
          <h3>Daily Reward</h3>
          <button onClick={claimDaily} style={{ width: '100%', padding: '15px', borderRadius: '10px', background: '#27ae60', color: 'white', border: 'none' }}>
            Claim Daily +1000 🎁
          </button>
          
          <h3 style={{ marginTop: '30px' }}>Top Players (Leaderboard)</h3>
          <div style={{ background: '#222', padding: '10px', borderRadius: '10px' }}>
            <p>1. {user.first_name} (You) - 🪙 {balance}</p>
            <p style={{ color: '#888' }}>2. Abebe - 🪙 15,400</p>
            <p style={{ color: '#888' }}>3. Chala - 🪙 12,100</p>
          </div>
        </div>
      )}

      {tab === 'upgrade' && (
        <div>
          <h3>Upgrades</h3>
          <div style={{ background: '#222', padding: '20px', borderRadius: '15px' }}>
            <p>Multitap (Level {tapValue})</p>
            <button 
              onClick={() => {
                if (balance >= tapValue * 500) {
                  setBalance(prev => prev - tapValue * 500);
                  setTapValue(prev => prev + 1);
                } else { alert("Koiniin kee hin ga'u!"); }
              }}
              style={{ padding: '10px 20px', background: '#e67e22', border: 'none', color: 'white', borderRadius: '10px' }}
            >
              Upgrade for {tapValue * 500} 🪙
            </button>
          </div>
        </div>
      )}

      {tab === 'invite' && (
        <div style={{ marginTop: '40px' }}>
<a href={`https://t.me/share/url?url=${botLink}&text=Koottuu koinni waliin sassaabbannu! Username koo: @${user.username}`} ...
             style={{ display: 'block', padding: '15px', background: '#3498db', color: 'white', textDecoration: 'none', borderRadius: '10px', fontWeight: 'bold' }}>
            Invite a Friend 🚀
          </a>
        </div>
      )}

      {/* Bottom Navigation */}
      <div style={{ position: 'fixed', bottom: 0, left: 0, width: '100%', display: 'flex', background: '#111', padding: '15px 0', borderTop: '1px solid #333' }}>
        <button onClick={() => setTab('home')} style={{ flex: 1, background: 'none', border: 'none', color: tab === 'home' ? '#f1c40f' : 'white' }}>Home</button>
        <button onClick={() => setTab('tasks')} style={{ flex: 1, background: 'none', border: 'none', color: tab === 'tasks' ? '#f1c40f' : 'white' }}>Tasks</button>
        <button onClick={() => setTab('upgrade')} style={{ flex: 1, background: 'none', border: 'none', color: tab === 'upgrade' ? '#f1c40f' : 'white' }}>Upgrade</button>
        <button onClick={() => setTab('invite')} style={{ flex: 1, background: 'none', border: 'none', color: tab === 'invite' ? '#f1c40f' : 'white' }}>Invite</button>
      </div>
    </div>
  );
}

export default App;