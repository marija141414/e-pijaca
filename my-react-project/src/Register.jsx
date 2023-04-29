import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
    let navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();

    axios.post('http://127.0.0.1:8000/api/register', {
      name,
      email,
      password
    })
      .then(response => {
        console.log(response.data);
        alert("USPEH!")
        navigate('/login')
      })
      .catch(error => console.error(error));
  };

  return (
    <div className="login-container">
      <h2>Register</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="input-container">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" required value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="input-container">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="input-container">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit" className="login-button">Register</button>
      </form>
    </div>
  );
};

export default Register;
