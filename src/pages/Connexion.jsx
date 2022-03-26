import {
	Keyboard,
	KeyboardAvoidingView,
	StyleSheet,
	Text,
	TextInput,
	TouchableWithoutFeedback,
	View,
} from "react-native";

import { Platform } from "expo-modules-core";
import { StatusBar } from "expo-status-bar";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";

const Connexion = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const login = async (email, password) => {
		await signInWithEmailAndPassword(auth, email, password);
	};

	return (
		<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
			<KeyboardAvoidingView
				style={styles.container}
				behavior={Platform.OS === "ios" ? "padding" : undefined}>
				<Text style={styles.title}>Connexion</Text>

				<View style={styles.form}>
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

					<TouchableWithoutFeedback
						onPress={() => {
							login(email, password);
						}}>
						<View style={styles.button}>
							<Text style={styles.buttonText}>Connexion</Text>
						</View>
					</TouchableWithoutFeedback>
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

export default Connexion;
