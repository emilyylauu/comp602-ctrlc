import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  sendEmailVerification,
  sendPasswordResetEmail,
  SigninUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "./firebase";

export const doCreateUserWithEmailNPassword = async (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const doSigninUserWithEmailNPassword = async (email, password) => {
  return SigninUserWithEmailAndPassword(auth, email, password);
};

export const doSigninWithGoogle = async (email, password) => {
  const provider = new GoogleAuthProvider();
  const resutl = await signInWithPopup(auth, provider);
  resutl.user;
  return resutl;
};

export const doSignOut = () => {
  return auth.signOut();
};

export const doPasswordReset = (email) => {
  return sendPasswordResetEmail(auth, email);
};

export const doPasswordChange = (email) => {
  return updatePassword(auth.currentUser, password);
};

export const doSendEmailVerfication = () => {
  return sendEmailVerification(auth.currentUser, {
    url: `${window.location.origin}/home`,
  });
};
