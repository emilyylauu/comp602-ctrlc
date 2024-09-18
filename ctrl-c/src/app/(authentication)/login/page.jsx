"use client";

import "./login.css";
import React, { useState } from "react";
import {
	doSignInWithEmailAndPassword,
	doSignInWithGoogle,
} from "@/app/(site)/firebase/auth";
import { useAuth } from "@/app/(contexts)/authContexts";
import { useRouter } from "next/navigation";

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
				setErrorMessage(
					"Incorrect email or password. Please try again!"
				);
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
				setErrorMessage(
					"Failed to sign in with Google. Please try again."
				); // Display error to the user
				setIsSigningIn(false);
			}
		}
	};

	return (
		<div>
			{userLoggedIn && router.push("/")}
			<div className="BlueBox">
				<div>
					<title>Login</title>
				</div>
				<div>
					<div>
						<h1>Welcome to Blank Web</h1>
					</div>

					<img src="logo.svg" alt="logo" />
				</div>

				<div className="WhiteBox">
					<h3 className="LoginText">Login</h3>

					{/* Error Message Display */}
					{errorMessage && (
						<div className="error-message">{errorMessage}</div>
					)}

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
							<img
								src="google.svg"
								alt="Google"
								className="googleicon"
							/>
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
						<a href="/resetpass" className="forgot-password">
							Forgot password?
						</a>
						<a href="/signup" className="signup">
							Can't login? Sign up
						</a>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
