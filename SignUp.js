import React, { useState } from 'react';
import './SignUp.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



function SignUp({ setUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [Error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email pattern
    if (!emailPattern.test(email)) {
      setError('Please enter a valid email address.');
      return; // Stop the function if the email is invalid
    }
    
    // Password validation
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // At least 8 characters, at least one letter and one number
    if (!passwordPattern.test(password)) {
      setError('Password must be at least 8 characters long and include both letters and numbers.');
      return; // Stop the function if the password is invalid
    }
    
    axios.post('http://localhost:3000/signup', {name, email, password})
    .then(result => {
      console.log(result);

      if(result.data.SignupStatus){
        navigate('/login'); 
      }else{
        setError(result.data.Error)
      }

  })
    .catch(err => console.log(err))

    navigate('/Dashboard')
  };



  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div classname = "text-danger">
          {Error && Error}
        </div>
        <input
            type="name"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}



export default SignUp;
