const firebase = require('firebase/app');
require('firebase/auth');
require('firebase/firestore'); // Firestore para almacenar perfiles
const firebaseConfig = require('../config/firebaseConfig');

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

exports.registerUser = async (email, password) => {
    const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
    return userCredential.user;
};

exports.loginUser = async (email, password) => {
    const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
    const token = await userCredential.user.getIdToken();
    return token;
};

// Guardar el perfil del usuario en Firestore
exports.saveUserProfile = async (userId, profileData) => {
    await db.collection('users').doc(userId).set(profileData);
};