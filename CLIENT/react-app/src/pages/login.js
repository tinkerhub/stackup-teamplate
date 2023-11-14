import React, { useState } from "react";
import './cards/final.css';
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [action, setAction] = useState("Login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      setIsLoading(true);

      const response = await fetch('http://localhost:4000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        console.log('Authentication successful');
        navigate('/create');
      } else {
        const errorData = await response.json();
        console.log('Authentication failed:', errorData.error);
      }
    } catch (error) {
      console.error('Error during authentication:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container1">
      <div className="header">
        <div className='text'>{action}</div>
      </div>
      <div className="inputs">
        <div className="input">
          <label htmlFor="username"></label>
          <input id="username" placeholder="Username" type="text" onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="input">
          <label htmlFor="password"></label>
          <input id="password" placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
        </div>
      </div>
      <div className='submit-container'>
        <button type="button" onClick={handleClick} disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Submit'}
        </button>
        <Link to='/signup'>
          <button type="button">
            Signup
          </button>
        </Link>
      </div>
    </div>
  );
};


