import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";
import { getReactNativePersistence } from "firebase/auth/react-native";
import { initializeApp } from "firebase/app";
import { initializeAuth } from "firebase/auth";

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
const auth = initializeAuth(app, {
	persistence: getReactNativePersistence(AsyncStorage),
});
const db = getFirestore(app);

export { auth, db };
