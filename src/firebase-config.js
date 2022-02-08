// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDYtDHbBmWAjUBGbFV7mwA3be5yofjkwlM",
  authDomain: "okane-73ae0.firebaseapp.com",
  projectId: "okane-73ae0",
  storageBucket: "okane-73ae0.appspot.com",
  messagingSenderId: "705424858248",
  appId: "1:705424858248:web:0ed7c800b85ffcafc6133d",
  measurementId: "G-HTLPNTEQ53",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
