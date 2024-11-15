import React from 'react';
import './App.css'; // Optional for styling

function App() {
  return (
    <div className="App">
      {/* Navigation Bar */}
      <header className="App-navbar">
        <div className="App-logo">
          <h1>Team Builder Clash</h1>
        </div>
        <div className="App-nav-buttons">
          <button className="btn login-btn" onClick={() => alert('Redirecting to Login...')}>
            Log In
          </button>
          <button className="btn signup-btn" onClick={() => alert('Redirecting to Sign Up...')}>
            Sign Up
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="App-main">
        <h1 className="App-title">Welcome to Team Builder Clash</h1>
        <p className="App-description">
          Your ultimate project planner and team scheduler. Empower your team and streamline communication.
        </p>
      </main>
    </div>
  );
}

export default App;


