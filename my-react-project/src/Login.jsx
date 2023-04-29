import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({onLogin}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
    let navigate= useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();

    axios.post('http://127.0.0.1:8000/api/login', {
      email,
      password
    })
      .then(response => {
        console.log(response)
        if(response.data.status==200){
            console.log(response.data)
            onLogin(response.data);
            window.sessionStorage.setItem("auth_token",response.data.token);
            window.sessionStorage.setItem("auth_name",response.data.username);
            window.sessionStorage.setItem("auth_id",response.data.id);
            alert("USPESNO")
            navigate('/proizvodi')
        }else{
            onLogin(null);
            alert(response.data.message)
        }
       
       
      })
      .catch(error => console.error(error));
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="input-container">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="input-container">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
};

export default Login;
