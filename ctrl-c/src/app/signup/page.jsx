"use client";

import React, { useState } from "react";
import "./signup.css";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../(contexts)/authContexts";
// import { doCreateUserWithEmailAndPassword } from "../firebase/auth";

const Signup = () => {
  //   const navigate = useNavigate();

  //   const [email, setEmail] = useState("");
  //   const [password, setPassword] = useState("");
  //   const [confirmPassword, setconfirmPassword] = useState("");
  //   const [isRegistering, setIsRegistering] = useState(false);
  //   const [errorMessage, setErrorMessage] = useState("");

  //   const { userLoggedIn } = useAuth();

  //   const onSubmit = async (e) => {
  //     e.preventDefault();
  //     if (!isRegistering) {
  //       setIsRegistering(true);
  //       await doCreateUserWithEmailAndPassword(email, password);
  //     }
  //   };

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
