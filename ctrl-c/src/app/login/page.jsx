"use client";
import "./login.css";
import React, { useState } from "react";
import {
  doSignInWithEmailAndPassword,
  doSignInWithGoogle,
} from "../firebase/auth";
import { useAuth } from "../(contexts)/authContexts";

const Login = () => {
  const { userLoggedIn } = useAuth;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!isSigningIn) {
      setIsSigningIn(true);

      try {
        await doSignInWithEmailAndPassword(email, password);
      } catch (error) {
        setErrorMessage(error.message);
        setIsSigningIn(false);
      }
    }
  };

  const onGoogleSignIn = async (e) => {
    e.preventDefault();

    if (!isSigningIn) {
      setIsSigningIn(true);
      try {
        await doSignInWithGoogle();
      } catch (error) {
        setErrorMessage(error.message); // Display error to the user
        setIsSigningIn(false);
      }
    }
  };

  return (
    <div>
      {/* {userLoggedIn && <Navigate to={"/"} replace={true} />} */}
      <div className="BlueBox">
        <div>
          <title>Login Page</title>
        </div>
        <div>
          <div>
            <h1>Welcome to Blank Web</h1>
          </div>

          <img src="/image/logo.png" alt="logo" />
        </div>

        <div className="WhiteBox">
          <h3 className="LoginText">Login</h3>

          <div className="label-input-container">
            <label className="text">User/Email</label>
            <input
              className="inputs"
              type="email"
              placeholder="User/Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="label-input-container">
            <div className="text">Password</div>
            <input
              className="inputs"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="label-input-container">
            <div className="text">Sign In With Google</div>
            <button className="inputs" onClick={onGoogleSignIn}>
              Sign In With Google
            </button>
          </div>

          <button
            className="LoginButton"
            onClick={onSubmit}
            disabled={isSigningIn}
          >
            Login
          </button>

          <div className="links">
            <a
              href="http://localhost:3000/resetpass"
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
    </div>
  );
};

export default Login;
