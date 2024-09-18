import React from "react";
import "./verify.css";

const Verify = () => {
  return (
    <div>
      <div>
        <title>Verification Page</title>
      </div>

      <div className="whitebox">
        <img src="/image/verify-100.png" alt="tick" />
        <h1>Verify your email</h1>
        <p>
          We have sent a link to you "user’s email". Please verify to activate
          your account
        </p>
      </div>

      <div className="links">
        <a href="http://localhost:3000/login">Back to login</a>
      </div>
    </div>
  );
};

export default Verify;
