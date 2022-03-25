import { Button, StyleSheet, TextInput, View } from "react-native";

import { CommonActions } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";

const Connexion = ({ navigation }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const login = async (email, password) => {
		await signInWithEmailAndPassword(auth, email, password);
		navigation.dispatch(
			CommonActions.reset({
				index: 0,
				routes: [{ name: "AuthenticatedTab" }],
			})
		);
	};

	return (
		<View style={styles.container}>
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
				title="Connexion"
				onPress={() => {
					login(email, password);
				}}
			/>
			<StatusBar style="auto" />
		</View>
	);
};

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

export default Connexion;
