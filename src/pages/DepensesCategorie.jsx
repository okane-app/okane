import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { auth, db } from "../../firebase";
import { collection, deleteDoc, doc, query, where } from "firebase/firestore";

import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { SwipeListView } from "react-native-swipe-list-view";
import { useCollectionData } from "react-firebase-hooks/firestore";

// function that takes a date and returns its string value in format dd/mm/yyyy
function formatDate(date) {
	const day = date.getDate();
	const month = date.getMonth() + 1;
	const year = date.getFullYear();
	return `${day < 10 ? "0" + day : day}/${
		month < 10 ? "0" + month : month
	}/${year}`;
}

const DepensesCategorie = ({ navigation, route }) => {
	const user = auth.currentUser;

	const [depenses] = useCollectionData(
		query(
			collection(db, "users", user.uid, "depenses"),
			where("categorie", "==", route.params.categorie)
		)
	);

	const renderDepense = ({ item }) => (
		<View style={styles.depense}>
			<Text style={{ fontSize: 16, paddingLeft: 10 }}>{item.nom}</Text>
			<View
				style={{
					flexDirection: "row",
					justifyContent: "space-between",
					width: "45%",
				}}>
				<Text style={{ fontSize: 16 }}>{formatDate(item.date.toDate())}</Text>
				<Text style={{ fontSize: 16, paddingRight: 10 }}>{item.montant} €</Text>
			</View>
		</View>
	);

	const renderSwipeButtons = (data, map) => (
		<View style={styles.swipeButtons}>
			<TouchableOpacity
				style={[styles.backButton, styles.backButtonRL]}
				onPress={() => map[data.item.id].closeRow()}>
				<Text style={{ color: "white" }}>Fermer</Text>
			</TouchableOpacity>

			<TouchableOpacity
				style={[styles.backButton, styles.backButtonRR]}
				onPress={async () => {
					await deleteDepense(data.item.id);
				}}>
				<Ionicons name="trash-outline" color={"#FFF"} size={28} />
			</TouchableOpacity>

			<TouchableOpacity
				style={[styles.backButton, styles.backButtonL]}
				onPress={() => {
					map[data.item.id].closeRow();
					navigation.navigate("ModifierDepense", {
						depense: data.item.id,
						title: data.item.nom,
					});
				}}>
				<Ionicons name="create-outline" color={"#FFF"} size={28} />
			</TouchableOpacity>
		</View>
	);

	const deleteDepense = async (id) => {
		await deleteDoc(doc(db, "users", user.uid, "depenses", id));
	};

	return (
		<View style={styles.container}>
			<View style={styles.depenses}>
				{depenses && depenses.length === 0 && (
					<View style={{ marginTop: 20 }}>
						<Text style={{ alignSelf: "center" }}>
							Tu n'as aucune dépense dans cette catégorie. Et si tu en ajoutais
							une ?
						</Text>
					</View>
				)}

				{depenses && depenses.length > 0 && (
					<SwipeListView
						useFlatList={true}
						data={[...depenses].sort((a, b) => a.nom > b.nom)}
						renderItem={renderDepense}
						renderHiddenItem={renderSwipeButtons}
						keyExtractor={(item) => item.id}
						leftOpenValue={75}
						rightOpenValue={-150}
					/>
				)}
			</View>

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

	depenses: {
		flex: 1,
		alignSelf: "stretch",
	},

	depense: {
		flexDirection: "row",
		justifyContent: "space-between",
		borderBottomWidth: 1,
		borderBottomColor: "#E8E8E8",
		paddingTop: 16,
		paddingBottom: 16,
		backgroundColor: "white",
	},

	swipeButtons: {
		alignItems: "center",
		flex: 1,
		flexDirection: "row",
		justifyContent: "space-between",
		paddingLeft: 15,
	},

	backButton: {
		alignItems: "center",
		bottom: 0,
		justifyContent: "center",
		position: "absolute",
		top: 0,
		width: 75,
	},

	backButtonL: {
		backgroundColor: "orange",
	},

	backButtonRL: {
		backgroundColor: "blue",
		right: 75,
	},

	backButtonRR: {
		backgroundColor: "red",
		right: 0,
	},
});

export default DepensesCategorie;
