"use client";

import React from "react";
import "./signup.css";

const Signup = () => {
  return (
    <div className="BlueBox">
      <div>
        <title>Sign Up Page</title>
      </div>

      <div className="WhiteBox">
        <h1>Sign Up</h1>

        <div className="label-input-container">
          <label>Username </label>
          <input className="inputs" type="text" placeholder="Username" />
        </div>

        <div className="label-input-container">
          <label>Email </label>
          <input className="inputs" type="email" placeholder="Email" />
        </div>

        <div className="label-input-container">
          <label>Password </label>
          <input className="inputs" type="password" placeholder="Password" />
        </div>

        <button
          className="SignupButton"
          onClick={() =>
            (window.location.href = "http://localhost:3000/verify")
          }
        >
          Sign Up
        </button>

        <div className="links">
          <a href="http://localhost:3000/login">Back to login</a>
        </div>
      </div>
    </div>
  );
};

export default Signup;
