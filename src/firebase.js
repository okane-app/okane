import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore";

import {
	signInWithEmailAndPassword,
	sendPasswordResetEmail,
	signOut,
} from "firebase/auth";

const firebaseConfig = {
	apiKey: "***REMOVED***",
	authDomain: "***REMOVED***",
	projectId: "***REMOVED***",
	storageBucket: "***REMOVED***",
	messagingSenderId: "***REMOVED***",
	appId: "***REMOVED***",
	measurementId: "***REMOVED***",
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
