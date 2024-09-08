// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC8lBIy-cRz8KPGee2Xp7eUlnmFznCpVvA",
  authDomain: "blankweb-ctrlc.firebaseapp.com",
  projectId: "blankweb-ctrlc",
  storageBucket: "blankweb-ctrlc.appspot.com",
  messagingSenderId: "976361707648",
  appId: "1:976361707648:web:1f38407353215e61932e65",
  measurementId: "G-57WP3V5SBN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
