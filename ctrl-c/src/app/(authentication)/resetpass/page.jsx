"use client";

import React, { useState } from "react";
import "./resetpass.css";
import { doPasswordReset } from "@/app/(site)/firebase/auth";

const Reset = () => {
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // const EmailFormat = (email) => {
  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   return emailRegex.test(email);
  // };

  const onSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload on form submit

    // check if the email is valid
    if (!isValidEmail) {
      setIsValidEmail(true); // set the email as invalid
      setErrorMessage("Please enter a valid email address."); // display error message for invalid email
      return; // if email is invalid, funtion stopped
    }

    // if email valid, continue processing
    try {
      await doPasswordReset(email); // attemp to send email request
      setSuccessMessage(
        "Instructions to reset your password have been sent to your email."
      );
    } catch (error) {
      setErrorMessage("Failed to reset password. Please try again.");
    }
    setIsValidEmail(false); // reset the email validity to false after error
  };

  return (
    <div>
      <div>
        <title>Reset Password</title>
      </div>

      <div className="whitebox">
        <h1>Reset Password</h1>
        <p>
          Please enter your email address and we'll send you instructions to
          reset your password.
        </p>

        {/* error message display */}
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}

        <input
          className="inputs"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)} // update email state when typing
        />
        {/* submit button after user entered their email */}
        <button className="SubmitButton" onClick={onSubmit}>
          Submit
        </button>
      </div>

      <div className="links">
        <a href="http://localhost:3000/login">Back to login</a>
      </div>
    </div>
  );
};

export default Reset;
