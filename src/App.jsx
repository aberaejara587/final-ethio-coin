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

  // Telegram WebApp init
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

  // ADSGRAM SDK LOAD (IMPORTANT)
  useEffect(() => {
    if (!window.Adsgram) {
      const script = document.createElement("script");
      script.src = "https://adsgram.ai/sdk.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('balance', balance.toString());
    localStorage.setItem('level', level.toString());
    localStorage.setItem('tapValue', tapValue.toString());
  }, [balance, level, tapValue]);

  // ADSGRAM SHOW AD
  const showAd = () => {
    if (window.Adsgram) {
      const AdController = window.Adsgram.init({ blockId: "22986" });

      AdController.show()
        .then(() => {
          setBalance(prev => prev + 5000);
          alert("Ad ilaalte! +5000 🪙");
        })
        .catch(() => {
          alert("Ad xumuruu qabda.");
        });

    } else {
      alert("Adsgram SDK hin fe'amne.");
    }
  };

  const handleTap = () => {
    setBalance(prev => prev + tapValue);
    if (window.Telegram?.WebApp?.HapticFeedback) {
      window.Telegram.WebApp.HapticFeedback.impactOccurred('light');
    }
  };

  return (
    <div style={{ textAlign: 'center', background: '#000', color: 'white', minHeight: '100vh', padding: '20px' }}>
      <h2>👋 {user.first_name}</h2>
      <h1>🪙 {balance}</h1>

      <button onClick={handleTap}>TAP</button>
      <br /><br />

      <button onClick={showAd}>
        Watch Ad (+5000)
      </button>
    </div>
  );
}

export default App;