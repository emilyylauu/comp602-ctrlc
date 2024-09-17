// Import the functions needed from the Firebase SDKs
import { initializeApp } from "firebase/app"; // Import the function to initialsze the Firebase app
import { getFirestore } from "firebase/firestore"; // Import function to use Firestore

//web app Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC8lBIy-cRz8KPGee2Xp7eUlnmFznCpVvA", // API key for Firebase services
  authDomain: "blankweb-ctrlc.firebaseapp.com", // Domain for Firebase Authentication
  projectId: "blankweb-ctrlc", // Project ID specific to your Firebase project
  storageBucket: "blankweb-ctrlc.appspot.com", // Cloud Storage bucket URL
  messagingSenderId: "976361707648", // Sender ID for Firebase Cloud Messaging
  appId: "1:976361707648:web:1f38407353215e61932e65", // App ID for the Firebase project
  measurementId: "G-57WP3V5SBN" // Measurement ID for Google Analytics (if enabled)
};

// Initialise Firebase
const app = initializeApp(firebaseConfig); // Initialise the Firebase app with the provided configuration
const db = getFirestore(app); // Initialise Firestore using the initialized Firebase app

//Export the Firestore 
export { db }; 
