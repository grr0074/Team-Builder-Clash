import React, { useState } from 'react';
import './LogIn.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Login({ setUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [Error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/login', {email, password})
    .then(result => {
      console.log(result);

      if(result.data.loginStatus && result.data.Admin){
        localStorage.setItem('token', result.data.token);
        navigate('/dashboard');
      }else if(result.data.loginStatus) {
        localStorage.setItem('token', result.data.token);
        navigate('/dashboard');
      }else{
        setError(result.data.Error)
      }

      return email;


  })
    .catch(err => console.log(err))


  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div classname = "text-danger">
          {Error && Error}
        </div>
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
