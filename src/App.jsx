import React, { useState, useEffect } from 'react';

function App() {
  const [balance, setBalance] = useState(() => {
    const saved = localStorage.getItem('balance');
    return saved ? parseInt(saved) : 0;
  });

  const [tab, setTab] = useState('home');
  const [level, setLevel] = useState(() => {
    const savedLevel = localStorage.getItem('level');
    return savedLevel ? parseInt(savedLevel) : 1;
  });
  const [tapValue, setTapValue] = useState(() => {
    const savedTap = localStorage.getItem('tapValue');
    return savedTap ? parseInt(savedTap) : 1;
  });
  
  const [user, setUser] = useState({ first_name: "TapPlayer", username: "" });
  const [wallet, setWallet] = useState(null);

  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    if (tg) {
      tg.ready();
      tg.expand();
      const userData = tg.initDataUnsafe?.user;
      if (userData) {
        setUser({ first_name: userData.first_name, username: userData.username || "" });
      }
    }
  }, []);

  // Data hunda save gochuu
  useEffect(() => {
    localStorage.setItem('balance', balance.toString());
    localStorage.setItem('level', level.toString());
    localStorage.setItem('tapValue', tapValue.toString());
  }, [balance, level, tapValue]);

  const handleTap = () => {
    setBalance(prev => prev + tapValue);
    if (window.Telegram?.WebApp?.HapticFeedback) {
      window.Telegram.WebApp.HapticFeedback.impactOccurred('light');
    }
  };

  // Deposit Logic (Level Dabaluuf)
  const handleDepositLevelUp = () => {
    const amount = 0.5; // Fakkeenyaaf 0.5 TON
    const confirmPay = window.confirm(`Level ${level + 1} gahuuf ${amount} TON deposit gochuu barbaadduu?`);
    
    if (confirmPay) {
      // Asirratti kaffaltiin TON kallaattiin gara herrega keetti akka dabu godhama
      alert("Gara Telegram Wallet sigeessaa jira...");
      window.open(`https://t.me/wallet?startapp=deposit_${amount}`, '_blank');
      
      // Kaffaltiin yoo mirkanaaye Level ni dabala
      setLevel(prev => prev + 1);
      setTapValue(prev => prev + 2); // Tap power ni dabala
      setBalance(prev => prev + 5000); // Bonus bonus ni kennama
    }
  };

  const botLink = "https://t.me/Ethio_Coin1_bot";

  return (
    <div style={{ textAlign: 'center', fontFamily: 'Arial', padding: '20px', color: 'white', backgroundColor: '#000', minHeight: '100vh' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#222', padding: '10px', borderRadius: '15px' }}>
        <div>
          <span>👤 {user.first_name}</span><br/>
          <small style={{ color: '#f1c40f' }}>Level {level}</small>
        </div>
        <button 
          onClick={() => setTab('wallet')}
          style={{ background: '#0088cc', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '10px', fontWeight: 'bold' }}
        >
          {wallet ? "Connected" : "Wallet"}
        </button>
      </div>

      {/* Home Tab */}
      {tab === 'home' && (
        <div style={{ marginTop: '40px' }}>
          <div style={{ fontSize: '50px', fontWeight: 'bold' }}>🪙 {balance}</div>
          <p style={{ color: '#aaa' }}>Tap Power: +{tapValue}</p>
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

      {/* Tasks Tab */}
      {tab === 'tasks' && (
        <div style={{ textAlign: 'left' }}>
          <h3>Tasks & Rewards</h3>
          <button onClick={() => setBalance(balance + 1000)} style={{ width: '100%', padding: '15px', borderRadius: '10px', background: '#27ae60', color: 'white', border: 'none' }}>
            Claim Daily Reward +1000 🎁
          </button>
        </div>
      )}

      {/* Upgrade/Deposit Tab */}
      {tab === 'upgrade' && (
        <div>
          <h3>Boost Your Level</h3>
          <div style={{ background: '#222', padding: '20px', borderRadius: '15px', marginBottom: '10px' }}>
            <p>Current Level: {level}</p>
            <p style={{ fontSize: '12px', color: '#aaa' }}>Deposit TON to level up instantly and get +2 Tap Power!</p>
            <button 
              onClick={handleDepositLevelUp}
              style={{ width: '100%', padding: '15px', background: '#f39c12', color: 'white', border: 'none', borderRadius: '10px', fontWeight: 'bold' }}
            >
              Deposit 0.5 TON to Level Up 🚀
            </button>
          </div>
          
          <div style={{ background: '#222', padding: '20px', borderRadius: '15px' }}>
            <p>Multitap Upgrade</p>
            <button 
              onClick={() => {
                if (balance >= 500) {
                  setBalance(balance - 500);
                  setTapValue(tapValue + 1);
                } else { alert("Koiniin kee hin ga'u!"); }
              }}
              style={{ padding: '10px 20px', background: '#e67e22', border: 'none', color: 'white', borderRadius: '10px' }}
            >
              Upgrade with 500 🪙
            </button>
          </div>
        </div>
      )}

      {/* Invite Tab */}
      {tab === 'invite' && (
        <div style={{ marginTop: '40px' }}>
          <h2>Invite & Earn</h2>
          <p>Get +2000 per invite!</p>
          <button 
            onClick={() => window.open(`https://t.me/share/url?url=${botLink}&text=Ethio Coin waliin sassaabbadhu!`, '_blank')} 
            style={{ display: 'block', width: '100%', padding: '15px', background: '#3498db', color: 'white', border: 'none', borderRadius: '10px', fontWeight: 'bold' }}
          >
            Invite a Friend 🚀
          </button>
        </div>
      )}

      {/* Wallet Tab */}
      {tab === 'wallet' && (
        <div style={{ marginTop: '40px' }}>
          <h2>TON Wallet</h2>
          <div style={{ background: '#222', padding: '20px', borderRadius: '15px' }}>
            <p>Balance: 0.00 TON</p>
            <button 
              onClick={() => alert("Connecting to TON Wallet...")}
              style={{ width: '100%', padding: '15px', background: '#0088cc', color: 'white', border: 'none', borderRadius: '10px', fontWeight: 'bold' }}
            >
              Connect Wallet
            </button>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div style={{ position: 'fixed', bottom: 0, left: 0, width: '100%', display: 'flex', background: '#111', padding: '10px 0', borderTop: '1px solid #333' }}>
        <button onClick={() => setTab('home')} style={{ flex: 1, background: 'none', border: 'none', color: tab === 'home' ? '#f1c40f' : 'white' }}>Home</button>
        <button onClick={() => setTab('tasks')} style={{ flex: 1, background: 'none', border: 'none', color: tab === 'tasks' ? '#f1c40f' : 'white' }}>Tasks</button>
        <button onClick={() => setTab('upgrade')} style={{ flex: 1, background: 'none', border: 'none', color: tab === 'upgrade' ? '#f1c40f' : 'white' }}>Boost</button>
        <button onClick={() => setTab('invite')} style={{ flex: 1, background: 'none', border: 'none', color: tab === 'invite' ? '#f1c40f' : 'white' }}>Invite</button>
        <button onClick={() => setTab('wallet')} style={{ flex: 1, background: 'none', border: 'none', color: tab === 'wallet' ? '#0088cc' : 'white' }}>Wallet</button>
      </div>

    </div>
  );
}

export default App;