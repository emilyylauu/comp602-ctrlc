"use client";

import React, { useState } from "react";
import "./signup.css";
import { useAuth } from "@/app/(contexts)/authContexts";
import { doCreateUserWithEmailAndPassword } from "@/app/(site)/firebase/auth";
import { useRouter } from "next/navigation";

const Signup = () => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isRegistering, setIsRegistering] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	const { userLoggedIn } = useAuth();
	const router = useRouter();

	// Function to check for invalid words in the username
	const containsInvalidWords = (username) => {
		const invalidWords = ["fuck", "dick", "bastard", "nigger", "bitch"];
		return invalidWords.some((word) =>
			username.toLowerCase().includes(word)
		);
	};

	// Function to check email format
	const isValidEmail = (email) => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	};

	// Function to check password strength
	const isValidPassword = (password) => {
		const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
		return passwordRegex.test(password);
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		setErrorMessage("");

		// Validate email format
		if (!isValidEmail(email)) {
			setErrorMessage(
				"Invalid email format. Please enter a valid email."
			);
			return;
		}

		// Validate password strength
		if (!isValidPassword(password)) {
			setErrorMessage(
				"Password must be at least 6 characters long and contain both letters and numbers."
			);
			return;
		}

		// Validate username for invalid words
		if (containsInvalidWords(username)) {
			setErrorMessage(
				"Username contains inappropriate words. Please try another."
			);
			return;
		}

		try {
			setIsRegistering(true);
			await doCreateUserWithEmailAndPassword(username, email, password);
			router.push("/"); // Redirect to home on success
		} catch (error) {
			setErrorMessage("Invalid Username or Email or Password");
		} finally {
			setIsRegistering(false);
		}
	};

	return (
		<>
			{userLoggedIn && router.push("/")}
			<div className="BlueBox">
				<div>
					<title>Sign Up</title>
				</div>

				<div className="WhiteBox">
					<h1>Sign Up</h1>

					{/* Error Message Display */}
					{errorMessage && (
						<div className="error-message">{errorMessage}</div>
					)}

					<div className="label-input-container">
						<label>Username </label>
						<input
							className="inputs"
							type="text"
							placeholder="Username"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
					</div>

					<div className="label-input-container">
						<label>Email </label>
						<input
							className="inputs"
							type="email"
							placeholder="Email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>

					<div className="label-input-container">
						<label>Password </label>
						<input
							className="inputs"
							type="password"
							placeholder="Password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>

					<button
						className="SignupButton"
						onClick={onSubmit}
						disabled={isRegistering}
					>
						Sign Up
					</button>

					<div className="links">
						<a href="/login">Back to login</a>
					</div>
				</div>
			</div>
		</>
	);
};

export default Signup;
