"use client";

import React, { useState } from "react";
import styles from "@/app/(component)/ResetPass/resetpass.module.css";
import { doPasswordReset } from "@/app/(component)/Firebase/auth";

const Reset = () => {
<<<<<<< HEAD
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Function to validate email format
  const EmailFormat = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const onSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload on form submit

    // Check if the email is valid
    if (!EmailFormat(email)) {
      setErrorMessage("Please enter a valid email address.");
      setSuccessMessage(""); // Clear success message if present
      return;
    }

    // If email is valid, continue processing
    try {
      await doPasswordReset(email); // Attempt to send email request
      setErrorMessage(""); // Clear error message if present
      setSuccessMessage(
        "Instructions to reset your password have been sent to your email."
      );
    } catch (error) {
      setErrorMessage("Failed to reset password. Please try again.");
      setSuccessMessage(""); // Clear success message if present
    }
  };

  return (
    <div className={styles.background}>
      <div>
        <title>Reset Password</title>
      </div>

      <div className={styles.ResetPassContainer}>
        <h1>Reset Password</h1>
        <p className={styles.para}>
          Please enter your email address and we'll send you instructions to
          reset your password.
        </p>

        {/* Error and Success Messages */}
        {errorMessage && <div className={styles["error-message"]}>{errorMessage}</div>}
        {successMessage && <div className={styles["success-message"]}>{successMessage}</div>}

        {/* Email Input Field */}
        <input
          className={styles.inputs}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Submit Button */}
        <button className={styles.SubmitButton} onClick={onSubmit}>
          Submit
        </button>

        {/* Back to Login Link */}
        <div className={styles.links}>
          <a href="/">Back to login</a>
        </div>
      </div>
    </div>
  );
=======
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
		<div className={styles.background}>
			<div>
				<title>Reset Password</title>
			</div>

			<div className={styles.WhiteBox}>
				<h1>Reset Password</h1>
				<p className={styles.para}>
					Please enter your email address and we'll send you
					instructions to reset your password.
				</p>

				{/* Error Message Display */}
				{errorMessage && (
					<div className={styles["error-message"]}>
						{errorMessage}
					</div>
				)}

				{/* Success Message Display */}
				{successMessage && (
					<div className={styles["success-message"]}>
						{successMessage}
					</div>
				)}

				<input
					className={styles.inputs}
					type="email"
					placeholder="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)} // update email state when typing
				/>
				{/* submit button after user entered their email */}
				<button className={styles.SubmitButton} onClick={onSubmit}>
					Submit
				</button>

				<div className={styles.links}>
					<a href="/">Back to login</a>
				</div>
			</div>
		</div>
	);
>>>>>>> f7b58342267fe2b69c4f1f2f1a804a351c5cc7b7
};

export default Reset;
