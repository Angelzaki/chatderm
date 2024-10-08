// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);

// Get the authentication instance
const auth = getAuth(appFirebase);

// Get the Firestore database instance
const db = getFirestore(appFirebase);

// Export the initialized instances
export { appFirebase, auth, db };
