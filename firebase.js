// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCP1qGEC32JdAdaQ3pk3xgNq32vYXPqB70",
  authDomain: "chatderm-a65c0.firebaseapp.com",
  projectId: "chatderm-a65c0",
  storageBucket: "chatderm-a65c0.appspot.com",
  messagingSenderId: "1038720370031",
  appId: "1:1038720370031:web:c8769db7517ab15da8549a"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);

// Get the authentication instance
const auth = getAuth(appFirebase);

// Get the Firestore database instance
const db = getFirestore(appFirebase);

// Export the initialized instances
export { appFirebase, auth, db };