import { Button, StyleSheet, Text, TextInput, View, TouchableOpacity, } from "react-native";
import { addDoc, collection, query, updateDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";

import RNPickerSelect from "react-native-picker-select";
import { RadioButton } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useState } from "react";

const NouvelleDepense = ({ navigation }) => {
	const user = auth.currentUser;

	const [checked, setChecked] = useState("first");
	const [categorie, setCategorie] = useState("");
	const [nom, setNom] = useState("");
	const [montant, setMontant] = useState("");
	const [frequence, setFrequence] = useState("");

	const usersCollectionRef = collection(db, "users", user.uid, "depenses");

	let date = new Date();

	const ajouter = async () => {
		await addDoc(usersCollectionRef, {
			nom: nom,
			montant: parseFloat(montant),
			categorie: categorie,
			date: date,
		})
			.then(async (docRef) => {
				await updateDoc(docRef, { id: docRef.id });
			})
			.catch((error) => {
				console.error("Error adding document: ", error);
			});
	};

	const [categories, loading, error] = useCollectionData(
		query(collection(db, "users", user.uid, "categories"))
	);

	return (
		<View style={styles.container}>
			<View style={styles.form}>

		<View>
			<View style={styles.input}>
			{categories && (
				<RNPickerSelect 
					style={pickerSelectStyles}
					useNativeAndroidPickerStyle={false}
					value={categorie}
					onValueChange={setCategorie}
					placeholder={{ label: "Choisis une catégorie...", value: undefined }}
					items={categories?.map((categorie) => ({
						key: categorie.id,
						label: categorie.nom,
						value: categorie.id,
					}))}
				/>
			)}
			
			</View>
			<Text
				style={styles.link_color}
				onPress={() => navigation.navigate("NouvelleCategorie")}
			>
				Nouvelle Catégorie
			</Text>
			<StatusBar style="auto" />
		</View>

			{/* {loading && <Text>Chargement des catégories</Text>}
            {error && <Text>Erreur : {JSON.stringify(error)}</Text>} */}


			

			

			<View style={styles.input}>
			<TextInput
				title="Nom de la dépense"
				style={{ height: 50 }}
				placeholder="Chaussure"
				onChangeText={setNom}
			/>
			</View>

			<View style={styles.input}>
				<TextInput
					style={{ height: 50 }}
					title="Montant"
					placeholder="14,50 €"
					onChangeText={setMontant}
				/>
			</View>
					
					

			<TouchableOpacity
				onPress={() => {
					ajouter(nom, montant, categorie).then(
						navigation.navigate("UserTab", { screen: "Dépenses" })
					);
				}}
			>
				<View style={styles.button}>
							<Text style={styles.buttonText}>Ajouter</Text>
				</View>
			</TouchableOpacity>
			<StatusBar style="auto" />
			</View>
		</View>
	);
};

export default NouvelleDepense;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		paddingTop: 100,
	},



	link_color: {
		color: "#5DB075",
		marginBottom: 10,
		marginLeft: 200,

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

const pickerSelectStyles = StyleSheet.create({
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
  });


