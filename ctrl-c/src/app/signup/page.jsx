"use client";

import React, { useState } from "react";
import "./signup.css";
import { useAuth } from "../(contexts)/authContexts";
import { doCreateUserWithEmailAndPassword } from "../firebase/auth";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";

const Signup = () => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	// const [confirmPassword, setconfirmPassword] = useState("");
	const [isRegistering, setIsRegistering] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	const { userLoggedIn } = useAuth();
	const router = useRouter();

	const onSubmit = async (e) => {
		e.preventDefault();
		setErrorMessage("");

		try {
			setIsRegistering(true);
			await doCreateUserWithEmailAndPassword(username, email, password);
			router.push("/"); // Redirect to home on success
		} catch (error) {
			setErrorMessage(error.message);
		} finally {
			setIsRegistering(false);
		}
	};

	return (
		<>
			{userLoggedIn && redirect("/")}
			<div className="BlueBox">
				<div>
					<title>Sign Up Page</title>
				</div>

				<div className="WhiteBox">
					<h1>Sign Up</h1>

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
