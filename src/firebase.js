// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";

import { getAuth } from "firebase/auth";

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
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
