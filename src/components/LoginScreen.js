import React, { useState } from 'react';

function LoginScreen({ onLogin }) {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  // Set your shared access code here (you can change this to whatever you want)
  const CORRECT_CODE = '0809';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (code.toLowerCase() === CORRECT_CODE) {
      onLogin(true);
    } else {
      setError('Incorrect code');
      setTimeout(() => setError(''), 3000);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Ewan & [Partner Name]</h1>
        <p>Enter code</p>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            className="login-input"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Access code"
            autoFocus
          />
          <button type="submit" className="login-button">
            Enter
          </button>
          {error && <p className="login-error">{error}</p>}
        </form>
      </div>
    </div>
  );
}

export default LoginScreen;
