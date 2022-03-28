import {
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import { addDoc, collection, updateDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";

import { useState } from "react";

const NouvelleCategorie = ({ navigation }) => {
	const user = auth.currentUser;

	const [nom, setNom] = useState("");
	const [limite, setLimite] = useState("");

	const usersCollectionRef = collection(db, "users", user.uid, "categories");

	const creerCategorie = async () => {
		await addDoc(usersCollectionRef, {
			nom: nom,
			limite: parseFloat(limite),
		}).then(async (docRef) => {
			await updateDoc(docRef, { id: docRef.id });
		});
	};

	return (
		<View style={styles.container}>
			<View style={styles.form}>
				<TextInput
					style={styles.input}
					placeholder="Nom"
					onChangeText={setNom}
				/>

				<TextInput
					style={styles.input}
					placeholder="Limite"
					onChangeText={setLimite}
				/>

				<TouchableOpacity
					onPress={() => {
						creerCategorie(nom, limite).then(navigation.goBack());
					}}>
					<View style={styles.button}>
						<Text style={styles.buttonText}>Ajouter</Text>
					</View>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default NouvelleCategorie;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#ffffff",
		alignItems: "center",
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

	tinyLogo: {
		width: 30,
		height: 30,
	},

	form: {
		alignSelf: "stretch",
		marginTop: 32,
		marginLeft: 16,
		marginRight: 16,
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
	link_color: {
		color: "#5DB075",
		marginBottom: 10,
		marginLeft: 200,
	},
});
