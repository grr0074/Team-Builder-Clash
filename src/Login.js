import React, { useState } from 'react';
import './LogIn.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Main from "./App.js";


function Login({ setUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/login', {email, password})
    .then(result => {
      console.log(result);
    
      navigate('/dashboard');
      Main.setCurrentPage('home')

  })
    .catch(err => console.log(err))


  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;

