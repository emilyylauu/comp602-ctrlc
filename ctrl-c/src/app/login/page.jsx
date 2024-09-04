"use client";
import "./login.css";
import React from "react";

const Login = () => {
  return (
    <div className="BlueBox">
      <div>
        <title>Login Page</title>
      </div>
      <div>
        <div className="welcome">
          <h1>Welcome to Blank Web</h1>
        </div>

        <img src="/image/logo.png" alt="logo" />
      </div>

      <div className="WhiteBox">
        <h3 className="LoginText">Login</h3>

        <div className="label-input-container">
          <label className="text">User/Email</label>
          <input className="inputs" type="email" placeholder="User/Email" />
        </div>

        <div className="label-input-container">
          <div className="text">Password</div>
          <input className="inputs" type="password" placeholder="Password" />
        </div>

        <button
          className="LoginButton"
          onClick={() => (window.location.href = "#")}
        >
          Login
        </button>

        <div className="links">
          <a
            href="http://localhost:3000/forgotpass"
            className="forgot-password"
          >
            Forgot password?
          </a>
          <a href="http://localhost:3000/signup" className="signup">
            Can't login? Sign up
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
