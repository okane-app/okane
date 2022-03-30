import {
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import { auth, db } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";

import { showMessage } from "react-native-flash-message";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { useState } from "react";

const ModifierCategorie = ({ navigation, route }) => {
	const user = auth.currentUser;

	const idCategorie = route.params.categorie;

	const [categorie] = useDocumentData(
		doc(db, "users", user.uid, "categories", idCategorie)
	);

	const [nom, setNom] = useState("");
	const [limite, setLimite] = useState("");

	const [nomOnce, setNomOnce] = useState(false);
	const [limiteOnce, setLimiteOnce] = useState(false);

	if (categorie && !nomOnce) {
		setNom(categorie.nom);
		setNomOnce(true);
	}

	if (categorie && !limiteOnce) {
		setLimite(categorie.limite.toString());
		setLimiteOnce(true);
	}

	const modifierCategorie = async () => {
		if (!(nom.trim().length > 0 && limite.trim().length > 0)) {
			showMessage({
				message: "Veuillez remplir tous les champs",
				type: "danger",
			});
			return;
		}

		if (isNaN(parseFloat(limite)) || parseFloat(limite) <= 0.0) {
			showMessage({
				message: "La limite doit être un nombre supérieur à 0",
				type: "danger",
			});
			return;
		}

		await updateDoc(doc(db, "users", user.uid, "categories", idCategorie), {
			nom: nom,
			limite: parseFloat(limite),
		});

		navigation.goBack();
	};

	return (
		<View style={styles.container}>
			{categorie && (
				<View style={styles.form}>
					<TextInput
						style={styles.input}
						placeholder="Nom de la catégorie"
						value={nom}
						onChangeText={setNom}
						maxLength={30}
					/>

					<TextInput
						style={styles.input}
						placeholder="Budget"
						value={limite}
						onChangeText={setLimite}
					/>

					<TouchableOpacity
						onPress={async () => {
							await modifierCategorie(nom, limite);
						}}>
						<View style={styles.button}>
							<Text style={styles.buttonText}>Modifier</Text>
						</View>
					</TouchableOpacity>
				</View>
			)}
		</View>
	);
};

export default ModifierCategorie;

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
