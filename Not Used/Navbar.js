import React from 'react';
import './Navbar.css';

const Navbar = ({ user, setUser, navigate }) => {
  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/');  // Redirect to home page on logout
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <button onClick={() => navigate('/')}>Home</button>
        {user && (  // Display "Dashboard" only if the user is logged in
          <button onClick={() => navigate('/dashboard')}>Dashboard</button>
        )}
      </div>
      <div className="navbar-right">
        {user ? (
          <>
            <span>Welcome, {user.email}</span>
            <button onClick={handleLogout}>Log Out</button>
          </>
        ) : (
          <>
            <button onClick={() => navigate('/login')}>Login</button>
            <button onClick={() => navigate('/signup')}>Sign Up</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
