import React, { useState, useEffect } from 'react';
import { PageProvider, usePage } from './PageContext'; // Import the PageContext
import SignUp from './SignUp.js';  // Import the SignUp page
import Login from './Login.js';    // Import the Login page
import './Home.css';            // Include the styles
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Addashboard from './Addashboard.jsx';
import Emdashboard from './Emdashboard.jsx';
import Assignskill from './Assignskill.jsx';


function App() {
  return (
    <PageProvider>
      

      <BrowserRouter>
      <Main />
      <Routes>
        
        <Route path ='/login' element ={<Login></Login>}> </Route>
        <Route path ='/signup' element ={<SignUp></SignUp>}> </Route>       
        <Route path ='/dashboard' element ={<Emdashboard> </Emdashboard>} > </Route>
          <Route path ='/dashboard/assignskill' element ={<Assignskill> </Assignskill>}> </Route>
        <Route path ='/admindashboard' element ={<Addashboard></Addashboard>}> </Route>

      </Routes>
    </BrowserRouter>

    
    </PageProvider>
  );
}

function Main() {
  const { currentPage, setCurrentPage } = usePage(); // Access the context
  const [user, setUser] = useState(null); // Track logged-in user

  // Check for existing user (simulate login using token from localStorage)
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Simulate fetching user info from a token or backend
      setUser({ email: 'user@example.com' });  // Example user info
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');  // Remove session token
    setUser(null);  // Clear user state
    setCurrentPage('home');  // Go back to home page
  };

  // Dynamically render pages based on the current page
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home />; // Home page content
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

// Home component with welcome message and description
const Home = () => (
  <div className="home">
    <h1>Welcome to Team Builder Clash</h1>
    <p>Your ultimate project planning and team collaboration tool. Create, assign, and manage projects with ease.</p>
  </div>
);

export default App;