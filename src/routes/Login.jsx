/* eslint-disable no-unused-vars */
import { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css"
import { DataContext } from "../dataCotext";

const Login = () => {
  const [userName, setuserName] = useState("");
  const [password, setPassword] = useState("");

  const state = useContext(DataContext);

  // console.log(state);
  const navigate = useNavigate();

  useEffect(() => {
    if(localStorage.getItem('isAuthenticated') === "true")
      navigate('/');
  }, [])
  
  
  const handleSubmit = (event) => {
    event.preventDefault();

    const requestBody = {
      UserName: userName,
      password: password,
    };

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch("https://localhost:7008/api/Auth/LoginUser", {
      method: "post",
      body: JSON.stringify(requestBody),
      headers: config.headers
    }).then(res => res.json()).then(res => {
      localStorage.setItem('isAuthenticated', res);
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
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
        <button type="submit" color="primary">
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