"use client";

import styles from "@/app/(component)/Login/login.module.css";
import React, { useState } from "react";
import {
  doSignInWithEmailAndPassword,
  doSignInWithGoogle,
} from "@/app/(component)/Firebase/auth";

import { useRouter } from "next/navigation";
import { useAuth } from "@/app/(context)/auth";

const Login = () => {
  const { userLoggedIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!isSigningIn) {
      setIsSigningIn(true);
      try {
        await doSignInWithEmailAndPassword(email, password);
      } catch (error) {
        setErrorMessage("Incorrect email or password. Please try again!");
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
        setErrorMessage("Failed to sign in with Google. Please try again."); // Display error to the user
        setIsSigningIn(false);
      }
    }
  };

  return (
    <div className={styles.background}>
      {userLoggedIn && router.push("/home")}
      <div className={styles.BlueBox}>
        <div>
          <title>Login</title>
        </div>
        <div>
          <div>
            <h1 className={styles.heading}>Welcome to Blank Web</h1>
          </div>

          <img className={styles.image} src="logo.svg" alt="logo" />
        </div>

        <div className={styles.WhiteBox}>
          <h3 className={styles.LoginText}>Login</h3>

          {/* Error Message Display */}
          {errorMessage && (
            <div className={styles["error-message"]}>{errorMessage}</div>
          )}

          <div className={styles["label-input-container"]}>
            <label className={styles.text}>Email</label>
            <input
              className={styles.inputs}
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className={styles["label-input-container"]}>
            <div className={styles.text}>Password</div>
            <input
              className={styles.inputs}
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className={styles["label-input-container"]}>
            <div className={styles.text}>Sign In With Google</div>
            <button className={styles.inputs} onClick={onGoogleSignIn}>
              <img
                src="google.svg"
                alt="Google"
                className={styles.googleicon}
              />
              Sign In With Google
            </button>
          </div>

          <button
            className={styles.LoginButton}
            onClick={onSubmit}
            disabled={isSigningIn}
          >
            Login
          </button>

          <div className={styles.links}>
            <a href="/resetpass" className={styles["forgot-password"]}>
              Forgot password?
            </a>
            <a href="/sign-up" className={styles.signup}>
              Can't login? Sign up
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
