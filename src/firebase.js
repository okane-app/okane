// Import the functions you need from the SDKs you need

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

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
