import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";

import "./login.css"

const Login = () => {
  const [userName, setuserName] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const requestBody = {
      userName: userName,
      password: password,
    };

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch("https://localhost:7095/api/Auth/LoginUser", {
      method: "post",
      body: JSON.stringify(requestBody),
      headers: config.headers
    }).then(res => res.json()).then(res => {
      localStorage.setItem('token', res.message);
      localStorage.setItem('username', userName);
      navigate('/');
    }).catch(() => {
      alert("Invalid credentials");
    })
  };

  return (
    <div className="login_container">
      <form className="form_container" onSubmit={handleSubmit}>
        <h1 style={{ textAlign: "center", opacity: "0.6" }}>Login</h1>
        <input
          className="text_field"
          placeholder="Enter your username"
          type="text"
          value={userName}
          onChange={(event) => setuserName(event.target.value)}
          required
        />
        <input
          className="text_field"
          placeholder="Enter the password"
          variant="outlined"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
        <button type="submit" variant="contained" color="primary">
          Login
        </button>
        <Link to="/register" className="link">
          Sign Up for a New Account
        </Link>
      </form>
    </div>
  );
};

export default Login;