import React, { useState, useEffect } from 'react';

function App() {
  const [balance, setBalance] = useState(0);
  const [tab, setTab] = useState('home');

  return (
    <div style={{ textAlign: 'center', fontFamily: 'Arial', padding: '20px' }}>
      <h1>Ethio Coin</h1>
      
      {tab === 'home' && (
        <div>
          <div style={{ fontSize: '40px', margin: '20px' }}>🪙 {balance}</div>
          <button 
            onClick={() => setBalance(balance + 1)}
            style={{ padding: '20px', borderRadius: '50%', fontSize: '20px', backgroundColor: '#f1c40f' }}
          >
            TAP!
          </button>
        </div>
      )}

      {tab === 'tasks' && (
        <div>
          <h2>Daily Tasks</h2>
          <p>Subscribe to our channel (+1000)</p>
          <button onClick={() => setBalance(balance + 1000)}>Claim</button>
        </div>
      )}

      {tab === 'wallet' && (
        <div>
          <h2>Wallet</h2>
          <p>Connect your TON wallet (Coming Soon)</p>
        </div>
      )}

      <div style={{ position: 'fixed', bottom: 0, left: 0, width: '100%', display: 'flex', background: '#222', padding: '10px 0' }}>
        <button onClick={() => setTab('home')} style={{ flex: 1, color: 'white' }}>Home</button>
        <button onClick={() => setTab('tasks')} style={{ flex: 1, color: 'white' }}>Tasks</button>
        <button onClick={() => setTab('wallet')} style={{ flex: 1, color: 'white' }}>Wallet</button>
      </div>
    </div>
  );
}

export default App;