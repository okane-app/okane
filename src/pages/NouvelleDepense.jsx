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
	orderBy,
	query,
	updateDoc,
} from "firebase/firestore";
import { auth, db } from "../../firebase";

import DateTimePicker from "@react-native-community/datetimepicker";
import Ionicons from "react-native-vector-icons/Ionicons";
import RNPickerSelect from "react-native-picker-select";
import { StatusBar } from "expo-status-bar";
import { showMessage } from "react-native-flash-message";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useState } from "react";

const grayPlaceholder = Platform.OS === "ios" ? "#bebec0" : "#a3a3a3";

// function that takes a date and returns its string value in format dd/mm/yyyy
function formatDate(date) {
	const day = date.getDate();
	const month = date.getMonth() + 1;
	const year = date.getFullYear();
	return `${day < 10 ? "0" + day : day}/${
		month < 10 ? "0" + month : month
	}/${year}`;
}

const NouvelleDepense = ({ navigation }) => {
	const user = auth.currentUser;

	const [categorie, setCategorie] = useState("");
	const [depense, setDepense] = useState("");
	const [montant, setMontant] = useState("");

	const [date, setDate] = useState(new Date());
	const [show, setShow] = useState(false);

	const usersCollectionRef = collection(db, "users", user.uid, "depenses");

	const creerDepense = async () => {
		if (
			!(
				categorie.trim().length > 0 &&
				depense.trim().length > 0 &&
				montant.trim().length > 0
			)
		) {
			showMessage({
				message: "Veuillez remplir tous les champs",
				type: "danger",
			});
			return;
		}

		if (isNaN(parseFloat(montant)) || parseFloat(montant) <= 0.0) {
			showMessage({
				message: "Le montant doit être un nombre supérieur à 0",
				type: "danger",
			});
			return;
		}

		await addDoc(usersCollectionRef, {
			nom: depense,
			montant: parseFloat(montant),
			categorie: categorie,
			date: Timestamp.fromDate(date),
		}).then(async (docRef) => {
			await updateDoc(docRef, { id: docRef.id });
			showMessage({
				message: "Depense ajoutée avec succès !",
				type: "success",
			});
		});
	};

	const [categories, loading, error] = useCollectionData(
		query(
			collection(db, "users", user.uid, "categories"),
			orderBy("nom", "asc")
		)
	);

	return (
		<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
			<KeyboardAvoidingView
				style={styles.container}
				behavior={Platform.OS === "ios" ? "padding" : undefined}>
				<View style={styles.form}>
					<View>
						<View style={{ justifyContent: "center" }}>
							{categories && categories.every((categorie) => categorie.id) && (
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
							maxLength={30}
						/>
					</View>

					<View style={styles.input}>
						<TextInput
							style={{ height: 50 }}
							placeholder="Montant"
							onChangeText={setMontant}
							value={montant}
							maxLength={5}
							keyboardType={"numeric"}
						/>
					</View>

					<TouchableOpacity onPress={() => setShow(true)}>
						<View style={styles.datePicker}>
							<Text style={{ color: grayPlaceholder }}>{formatDate(date)}</Text>
							<Ionicons
								name="calendar-outline"
								size={20}
								color={grayPlaceholder}
								style={styles.calendarIcon}
							/>
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
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		backgroundColor: "#F6F6F6",
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

const picker = StyleSheet.create({
	placeholder: {
		color: grayPlaceholder,
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
