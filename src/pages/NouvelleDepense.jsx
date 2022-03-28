import {
	Keyboard,
	KeyboardAvoidingView,
	Platform,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View,
} from "react-native";
import {
	Timestamp,
	addDoc,
	collection,
	query,
	updateDoc,
} from "firebase/firestore";
import { auth, db } from "../../firebase";

import DateTimePicker from "@react-native-community/datetimepicker";
import RNPickerSelect from "react-native-picker-select";
import { StatusBar } from "expo-status-bar";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useState } from "react";

const NouvelleDepense = ({ navigation }) => {
	const user = auth.currentUser;

	const [categorie, setCategorie] = useState("");
	const [depense, setDepense] = useState("");
	const [montant, setMontant] = useState("");

	const [date, setDate] = useState(new Date());
	const [show, setShow] = useState(false);

	const usersCollectionRef = collection(db, "users", user.uid, "depenses");

	const creerDepense = async () => {
		await addDoc(usersCollectionRef, {
			nom: depense,
			montant: parseFloat(montant),
			categorie: categorie,
			date: Timestamp.fromDate(date),
		}).then(async (docRef) => {
			await updateDoc(docRef, { id: docRef.id });
		});
	};

	const [categories, loading, error] = useCollectionData(
		query(collection(db, "users", user.uid, "categories"))
	);

	return (
		<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
			<KeyboardAvoidingView
				style={styles.container}
				behavior={Platform.OS === "ios" ? "padding" : undefined}>
				<View style={styles.form}>
					<View>
						<View style={{ justifyContent: "center" }}>
							{categories && (
								<RNPickerSelect
									style={picker}
									useNativeAndroidPickerStyle={false}
									value={categorie}
									onValueChange={setCategorie}
									placeholder={{
										label: "Nom de la catégorie",
										value: undefined,
									}}
									items={categories?.map((categorie) => ({
										key: categorie.id,
										label: categorie.nom,
										value: categorie.id,
									}))}
								/>
							)}
						</View>
						<TouchableOpacity
							onPress={() => navigation.navigate("NouvelleCategorie")}>
							<Text style={styles.linkColor}>Nouvelle catégorie</Text>
						</TouchableOpacity>
						<StatusBar style="auto" />
					</View>

					<View style={styles.input}>
						<TextInput
							style={{ height: 50 }}
							placeholder="Nom de la dépense"
							onChangeText={setDepense}
							value={depense}
						/>
					</View>

					<View style={styles.input}>
						<TextInput
							style={{ height: 50 }}
							placeholder="Montant"
							onChangeText={setMontant}
							value={montant}
						/>
					</View>

					<TouchableOpacity onPress={() => setShow(true)}>
						<View style={styles.datePicker}>
							<Text style={{ color: "#a3a3a3" }}>{date.toString()}</Text>
							{/* Icône date */}
						</View>
					</TouchableOpacity>

					{show && (
						<DateTimePicker
							value={date}
							onChange={(e, date) => {
								if (date) setDate(date);
								setShow(false);
							}}
						/>
					)}

					<TouchableOpacity
						onPress={() => {
							creerDepense().then(() => {
								Keyboard.dismiss();
								setCategorie("");
								setDepense("");
								setMontant("");
							});
						}}>
						<View style={styles.button}>
							<Text style={styles.buttonText}>Ajouter</Text>
						</View>
					</TouchableOpacity>
					<StatusBar style="auto" />
				</View>
			</KeyboardAvoidingView>
		</TouchableWithoutFeedback>
	);
};

export default NouvelleDepense;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
	},

	linkColor: {
		color: "#5DB075",
		marginBottom: 8,
		marginRight: 10,
		alignSelf: "flex-end",
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

	datePicker: {
		justifyContent: "center",
		backgroundColor: "#F6F6F6",
		height: 50,
		paddingLeft: 16,
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

const picker = StyleSheet.create({
	placeholder: {
		color: "#a3a3a3",
	},

	inputAndroidContainer: {
		backgroundColor: "#F6F6F6",
		borderWidth: 1,
		borderColor: "#E8E8E8",
		padding: 16,
		borderRadius: 8,
		marginBottom: 8,
		height: 50,
	},

	inputAndroid: {
		color: "black",
	},

	inputIOSContainer: {
		backgroundColor: "#F6F6F6",
		borderWidth: 1,
		borderColor: "#E8E8E8",
		padding: 16,
		borderRadius: 8,
		marginBottom: 8,
		height: 50,
	},
});
