import React, { useState, useEffect } from 'react';

function App() {
  const [balance, setBalance] = useState(() => {
    const savedBalance = localStorage.getItem('balance');
    return savedBalance ? parseInt(savedBalance) : 0;
  });

  const [tab, setTab] = useState('home');
  const [user, setUser] = useState({ first_name: "TapPlayer", username: "" });
  const [walletAddress, setWalletAddress] = useState(null); // State wallet address qabatu

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

  // Wallet Connect Logic (Salphaatti)
  const connectWallet = async () => {
    try {
      // Asirratti kallaattiin Telegram Wallet akka banamu gargaara
      const walletUrl = "https://t.me/wallet/start?startapp=connect";
      window.open(walletUrl, '_blank');
      
      // Fakkeenyaaf address tokko set goona (Gara fuulduraatti SDK guutuu dabalanna)
      alert("Gara Telegram Wallet sigeessaa jira. Erga connect gootee address kee asitti ni mul'ata.");
      setWalletAddress("EQB...TON_ADDR"); // Address fakkeenyaa
    } catch (error) {
      console.error("Wallet connection error:", error);
    }
  };

  useEffect(() => {
    localStorage.setItem('balance', balance.toString());
  }, [balance]);

  return (
    <div style={{ textAlign: 'center', fontFamily: 'Arial', padding: '20px', color: 'white', backgroundColor: '#000', minHeight: '100vh' }}>
      
      {/* Header with User & Wallet Info */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#222', padding: '10px', borderRadius: '15px' }}>
        <span>👤 {user.first_name}</span>
        <button 
          onClick={connectWallet}
          style={{ background: '#0088cc', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '10px', fontSize: '12px' }}
        >
          {walletAddress ? "Connected" : "Connect Wallet"}
        </button>
      </div>

      {/* Home Tab */}
      {tab === 'home' && (
        <div style={{ marginTop: '40px' }}>
          <div style={{ fontSize: '50px', fontWeight: 'bold' }}>🪙 {balance}</div>
          <button onClick={() => setBalance(balance + 1)} style={{ marginTop: '20px', padding: '40px', borderRadius: '50%', backgroundColor: '#f1c40f', fontSize: '25px' }}>
            TAP!
          </button>
        </div>
      )}

      {/* Wallet Tab (Haaraa) */}
      {tab === 'wallet' && (
        <div style={{ marginTop: '40px' }}>
          <h3>TON Wallet</h3>
          <div style={{ background: '#222', padding: '20px', borderRadius: '15px', textAlign: 'left' }}>
            <p>Status: {walletAddress ? "✅ Connected" : "❌ Not Connected"}</p>
            {walletAddress && <p style={{ fontSize: '10px', color: '#aaa' }}>Address: {walletAddress}</p>}
            <button 
              onClick={connectWallet}
              style={{ width: '100%', padding: '15px', background: '#0088cc', border: 'none', color: 'white', borderRadius: '10px', fontWeight: 'bold' }}
            >
              {walletAddress ? "Change Wallet" : "Connect TON Wallet"}
            </button>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div style={{ position: 'fixed', bottom: 0, left: 0, width: '100%', display: 'flex', background: '#111', padding: '15px 0' }}>
        <button onClick={() => setTab('home')} style={{ flex: 1, background: 'none', border: 'none', color: tab === 'home' ? '#f1c40f' : 'white' }}>Home</button>
        <button onClick={() => setTab('wallet')} style={{ flex: 1, background: 'none', border: 'none', color: tab === 'wallet' ? '#f1c40f' : 'white' }}>Wallet</button>
      </div>
    </div>
  );
}

export default App;