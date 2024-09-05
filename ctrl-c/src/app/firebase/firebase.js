// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC8lBIy-cRz8KPGee2Xp7eUlnmFznCpVvA",
  authDomain: "blankweb-ctrlc.firebaseapp.com",
  projectId: "blankweb-ctrlc",
  storageBucket: "blankweb-ctrlc.appspot.com",
  messagingSenderId: "976361707648",
  appId: "1:976361707648:web:1f38407353215e61932e65",
  measurementId: "G-57WP3V5SBN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
export { app, auth };
