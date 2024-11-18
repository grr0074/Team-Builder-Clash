import React, { useState, useEffect } from 'react';
import { PageProvider, usePage } from './PageContext';
import SignUp from './SignUp';
import Login from './Login';
import './Home.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Edashboard from './Edashboard.jsx';

function App() {
  return (
    <PageProvider>
      <BrowserRouter>
        <Main />
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/dashboard' element={<Edashboard />} />
        </Routes>
      </BrowserRouter>
    </PageProvider>
  );
}

function Main() {
  const { currentPage, setCurrentPage } = usePage();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUser({ email: 'user@example.com' });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setCurrentPage('home');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home />;
      case 'login':
        return <Login setUser={setUser} />;
      case 'signup':
        return <SignUp setUser={setUser} />;
      default:
        return <h1>Page not found</h1>;
    }
  };

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-left">
          <button onClick={() => setCurrentPage('home')}>Home</button>
        </div>
        <div className="navbar-right">
          {user ? (
            <>
              <span>Welcome, {user.email}</span>
              <button onClick={handleLogout}>Log Out</button>
            </>
          ) : (
            <>
              <button onClick={() => setCurrentPage('login')}>Login</button>
              <button onClick={() => setCurrentPage('signup')}>Sign Up</button>
            </>
          )}
        </div>
      </nav>

      <main>
        {renderPage()}
      </main>
    </div>
  );
}

const Home = () => (
  <div className="home">
    <h1>Welcome to Team Builder Clash</h1>
    <p>Your ultimate project planning and team collaboration tool. Create, assign, and manage projects with ease.</p>
  </div>
);

export default App;
