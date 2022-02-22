import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import { getFirestore, collection, addDoc } from "firebase/firestore";

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDYtDHbBmWAjUBGbFV7mwA3be5yofjkwlM",
  authDomain: "okane-73ae0.firebaseapp.com",
  projectId: "okane-73ae0",
  storageBucket: "okane-73ae0.appspot.com",
  messagingSenderId: "705424858248",
  appId: "1:705424858248:web:0ed7c800b85ffcafc6133d",
  measurementId: "G-HTLPNTEQ53",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

const login = async (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      alert("Connexion réussie !");
    })
    .catch((error) => {
      console.error(error.message);
    });
};

const register = async (username, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      username: username,
      authProvider: "local",
      email,
    });

    if (user) {
      alert("Inscription réussie !");
    }
  } catch (err) {
    console.error(err);
  }
};

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
  }
};

const logout = () => {
  signOut(auth);
};

export {
  auth,
  db,
  signInWithEmailAndPassword,
  login,
  register,
  sendPasswordReset,
  logout,
};
