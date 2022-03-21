import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore";

import {
	signInWithEmailAndPassword,
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

// TODO MOVE

const sendPasswordReset = (email) => {
	try {
		sendPasswordResetEmail(auth, email);
		alert("Password reset link sent!");
	} catch (err) {
		console.error(err);
	}
};

const logout = () => {
	signOut(auth);
};

export { auth, db, sendPasswordReset, logout };
