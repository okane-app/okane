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
import { showMessage } from "react-native-flash-message";
import { useState } from "react";

const Inscription = ({ navigation }) => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const register = async (username, email, password) => {
		if (username.length === 0) {
			showMessage({
				message: "Veuillez entrer un nom d'utilisateur",
				type: "danger",
			});
			return;
		}

		createUserWithEmailAndPassword(auth, email, password)
			.then(async (userCredential) => {
				const user = userCredential.user;

				// Mise à jour du nom d'utilisateur interne
				await updateProfile(user, { displayName: username });

				// Création de l'utilisateur dans Firestore
				await setDoc(doc(db, "users", user.uid), {
					uid: user.uid,
					username,
				});
			})
			.catch((e) => showMessage({ message: e.message, type: "danger" }));
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
							keyboardType={"email-address"}
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

					<Text style={{ paddingLeft: 10 }}>
						En t'inscrivant, tu acceptes nos{" "}
						<Text style={styles.link}>conditions générales d'utilisation</Text>.
					</Text>

					<TouchableOpacity
						onPress={() => {
							register(username, email, password);
						}}>
						<View style={styles.button}>
							<Text style={styles.buttonText}>Inscription</Text>
						</View>

						<Text
							style={[styles.link, styles.already]}
							onPress={() => navigation.navigate("Connexion")}>
							Déjà un compte ?
						</Text>
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

	link: {
		color: "blue",
		textDecorationLine: "underline",
	},

	already: {
		marginTop: 20,
		alignSelf: "center",
	},
});

export default Inscription;
