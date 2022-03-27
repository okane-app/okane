import {
	Button,
	StyleSheet,
	Text,
	TextInput,
	ScrollView,
	View,
	Image,
	TouchableOpacity,
} from "react-native";
//import {Picker} from '@react-native-picker/picker';
import { db, auth } from "../../firebase";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import Icon from "react-native-vector-icons/FontAwesome";

import { collection, addDoc, updateDoc } from "firebase/firestore";

const NouvelleCategorie = ({ navigation }) => {
	const user = auth.currentUser;

	const [nom, setNom] = useState("");
	const [limite, setLimite] = useState("");
	const [open, setOpen] = useState(false);
	const [value, setValue] = useState(null);
	// const [items, setItems] = useState([
	//     { value: '../../assets/icones/divertissement.png', icon: () => <Image source={require('../../assets/icones/divertissement.png')} style={styles.tinyLogo} /> },
	//     { value: '../../assets/icones/materiel-scolaire.png', icon: () => <Image source={require('../../assets/icones/materiel-scolaire.png')} style={styles.tinyLogo} /> },
	//     { value: '../../assets/icones/panier-de-courses.png', icon: () => <Image source={require('../../assets/icones/panier-de-courses.png')} style={styles.tinyLogo} /> },
	//     { value: '../../assets/icones/soins-de-sante.png', icon: () => <Image source={require('../../assets/icones/soins-de-sante.png')} style={styles.tinyLogo} /> },
	//     { value: '../../assets/icones/variante-de-ballon.png', icon: () => <Image source={require('../../assets/icones/variante-de-ballon.png')} style={styles.tinyLogo} /> },
	//     { value: '../../assets/icones/ordinateur-de-bureau.png', icon: () => <Image source={require('../../assets/icones/ordinateur-de-bureau.png')} style={styles.tinyLogo} /> },
	//     { value: '../../assets/icones/avion.png', icon: () => <Image source={require('../../assets/icones/avion.png')} style={styles.tinyLogo} /> },

	// ]);

	const usersCollectionRef = collection(db, "users", user.uid, "categories");

	const ajouter = async () => {
		await addDoc(usersCollectionRef, { nom: nom, limite: parseFloat(limite) })
			.then(async (docRef) => {
				await updateDoc(docRef, { id: docRef.id });
			})
			.catch((error) => {
				console.error("Error adding document: ", error);
			});
	};

	return (
		<View style={styles.container}>
			<View style={styles.form}>
			<TextInput style={styles.input} placeholder="Nom" onChangeText={setNom} />

			<TextInput
				style={styles.input}
				placeholder="Limite"
				onChangeText={setLimite}
			/>

		<Text
				style={styles.link_color}
				onPress={() => navigation.navigate("AllCategorie")}
			>
		Nouvelle Catégorie
			</Text>

			<TouchableOpacity
				onPress={() => {
					ajouter(nom, limite).then(navigation.navigate("AllCategorie"));
				}}
			>
			<View style={styles.button}>
							<Text style={styles.buttonText}>Vos catégories</Text>
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
		justifyContent: "center",
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
