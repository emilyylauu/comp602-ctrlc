import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	sendPasswordResetEmail,
	sendEmailVerification,
	updatePassword,
	signInWithPopup,
	GoogleAuthProvider,
	updateProfile,
} from "firebase/auth";
import { auth } from "./firebase";

export const doCreateUserWithEmailAndPassword = async (
	username,
	email,
	password
) => {
	try {
		// Create the user with email and password
		const userCredential = await createUserWithEmailAndPassword(
			auth,
			email,
			password
		);
		const user = userCredential.user;
		await updateProfile(auth.currentUser, { displayName: username });

		// Send verification email to the new user
		await sendEmailVerification(user);

		return user; // Return the user object
	} catch (error) {
		console.error("Error creating user: ", error);
		throw error; // Rethrow error to handle it in the component
	}
};

export const doSignInWithEmailAndPassword = async (email, password) => {
	return signInWithEmailAndPassword(auth, email, password);
};

export const doSignInWithGoogle = async () => {
	const provider = new GoogleAuthProvider();
	try {
		const result = await signInWithPopup(auth, provider);
		return result.user; // return the authenticated user
	} catch (error) {
		console.error("Error signing in with Google: ", error);
		throw error; // rethrow the error to handle it in the component
	}
};

export const doSignOut = () => {
	return auth.signOut();
};

export const doPasswordReset = (email) => {
	return sendPasswordResetEmail(auth, email);
};

export const doPasswordChange = (password) => {
	return updatePassword(auth.currentUser, password);
};

export const doSendEmailVerification = () => {
	return sendEmailVerification(auth.currentUser, {
		url: `${window.location.origin}/home`,
	});
};
