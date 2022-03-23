import { Button, StyleSheet, TextInput, View } from "react-native";
import { auth, db } from "../../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

import { CommonActions } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";

const Inscription = ({ navigation }) => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const register = async (username, email, password) => {
		createUserWithEmailAndPassword(auth, email, password).then(
			async (userCredential) => {
				const user = userCredential.user;

				// Mise à jour du nom d'utilisateur interne
				await updateProfile(user, { displayName: username });

				// Création de l'utilisateur dans Firestore
				await setDoc(doc(db, "users", user.uid), {
					authProvider: "local",
				});
			}
		);
		navigation.dispatch(
			CommonActions.reset({
				index: 0,
				routes: [{ name: "UserTab" }],
			})
		);
	};

	return (
		<View style={styles.container}>
			<TextInput
				style={styles.input}
				placeholder="Nom d'utilisateur"
				onChangeText={setUsername}
			/>
			<TextInput
				style={styles.input}
				placeholder="Adresse mail"
				onChangeText={setEmail}
			/>
			<TextInput
				style={styles.input}
				placeholder="Mot de passe"
				secureTextEntry={true}
				onChangeText={setPassword}
			/>
			<Button
				title="Inscription"
				onPress={() => {
					register(username, email, password);
				}}
			/>
			<StatusBar style="auto" />
		</View>
	);
};

export default Inscription;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},

	input: {
		marginVertical: 10,
	},
});
