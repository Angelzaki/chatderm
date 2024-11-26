import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCP1qGEC32JdAdaQ3pk3xgNq32vYXPqB70",
  authDomain: "chatderm-a65c0.firebaseapp.com",
  projectId: "chatderm-a65c0",
  storageBucket: "chatderm-a65c0.appspot.com",
  messagingSenderId: "1038720370031",
  appId: "1:1038720370031:web:c8769db7517ab15da8549a"
};

const appFirebase = initializeApp(firebaseConfig);
const auth = getAuth(appFirebase);
const db = getFirestore(appFirebase);
const storage = getStorage(appFirebase);

export { auth, db, storage };
