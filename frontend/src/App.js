import React, { useState } from 'react';
import './App.css';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  const handleLogin = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return (
    <div className="App">
      <div className="container">
        <h1>JWT Auth Demo</h1>
        {!token ? (
          <Login onLogin={handleLogin} />
        ) : (
          <Dashboard token={token} onLogout={handleLogout} />
        )}
      </div>
    </div>
  );
}

export default App;
