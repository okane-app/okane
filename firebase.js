import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";
import { getReactNativePersistence } from "firebase/auth/react-native";
import { getStorage } from "firebase/storage";
import { initializeApp } from "firebase/app";
import { initializeAuth } from "firebase/auth";

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
const auth = initializeAuth(app, {
	persistence: getReactNativePersistence(AsyncStorage),
});
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
