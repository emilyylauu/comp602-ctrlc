import React from "react";
import "./resetpass.css";

const Reset = () => {
  return (
    <div>
      <div>
        <title>Reset Password</title>
      </div>

      <div className="whitebox">
        <h1>Reset Password</h1>
        <p>
          {" "}
          Please enter your email address and we'll send you instructions to
          reset your password.
        </p>
        <input className="inputs" type="email" placeholder="Email" />

        <button className="SubmitButton">Submit</button>
      </div>

      <div className="links">
        <a href="http://localhost:3000/login">Back to login</a>
      </div>
    </div>
  );
};

export default Reset;
