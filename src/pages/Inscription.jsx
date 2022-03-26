import {
	Keyboard,
	KeyboardAvoidingView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View,
} from "react-native";
import { auth, db } from "../../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

import { StatusBar } from "expo-status-bar";
import { useState } from "react";

const Inscription = () => {
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
					uid: user.uid,
					username,
				});
			}
		);
	};

	return (
		<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
			<KeyboardAvoidingView
				style={styles.container}
				behavior={Platform.OS === "ios" ? "padding" : undefined}>
				<Text style={styles.title}>Inscription</Text>

				<View style={styles.form}>
					<View style={styles.input}>
						<TextInput
							style={{ height: 50 }}
							placeholder="Nom d'utilisateur"
							onChangeText={setUsername}
						/>
					</View>

					<View style={styles.input}>
						<TextInput
							style={{ height: 50 }}
							placeholder="Adresse mail"
							onChangeText={setEmail}
						/>
					</View>

					<View style={styles.input}>
						<TextInput
							style={{ height: 50 }}
							placeholder="Mot de passe"
							secureTextEntry={true}
							onChangeText={setPassword}
						/>
					</View>

					<Text>
						En vous inscrivant, vous acceptez nos{" "}
						<Text style={{ color: "blue", textDecorationLine: "underline" }}>
							conditions générales d'utilisation
						</Text>
						.
					</Text>

					<TouchableOpacity
						onPress={() => {
							register(username, email, password);
						}}>
						<View style={styles.button}>
							<Text style={styles.buttonText}>Inscription</Text>
						</View>
					</TouchableOpacity>
				</View>

				<StatusBar style="auto" />
			</KeyboardAvoidingView>
		</TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		paddingTop: 100,
	},

	title: {
		fontSize: 30,
		fontWeight: "600",
	},

	form: {
		alignSelf: "stretch",
		marginTop: 32,
		marginLeft: 16,
		marginRight: 16,
	},

	input: {
		justifyContent: "center",
		backgroundColor: "#F6F6F6",
		height: 50,
		padding: 16,
		marginBottom: 16,
		borderWidth: 1,
		borderColor: "#E8E8E8",
		borderRadius: 8,
	},

	button: {
		marginTop: 32,
		alignItems: "center",
		paddingTop: 16,
		paddingBottom: 16,
		borderRadius: 100,
		backgroundColor: "#74CA8D",
	},

	buttonText: {
		color: "white",
		fontSize: 16,
		fontWeight: "600",
	},
});

export default Inscription;
