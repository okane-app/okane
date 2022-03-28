import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { auth, db } from "../../firebase";
import { collection, deleteDoc, doc, query, where } from "firebase/firestore";

import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { SwipeListView } from "react-native-swipe-list-view";
import { useCollectionData } from "react-firebase-hooks/firestore";

const DepensesCategorie = ({ route }) => {
	const user = auth.currentUser;

	const [depenses] = useCollectionData(
		query(
			collection(db, "users", user.uid, "depenses"),
			where("categorie", "==", route.params.categorie)
		)
	);

	depenses?.sort((a, b) => a.date > b.date);

	const renderDepense = ({ item }) => (
		<View style={styles.depense}>
			<Text style={{ fontSize: 16, paddingLeft: 10 }}>{item.nom}</Text>
			<Text style={{ fontSize: 16, paddingRight: 10 }}>{item.montant} €</Text>
		</View>
	);

	const renderSwipeButtons = (data, map) => (
		<View style={styles.swipeButtons}>
			<TouchableOpacity
				style={[styles.backButton, styles.backButtonLeft]}
				onPress={() => map[data.item.id].closeRow()}>
				<Text style={{ color: "white" }}>Fermer</Text>
			</TouchableOpacity>

			<TouchableOpacity
				style={[styles.backButton, styles.backButtonRight]}
				onPress={async () => {
					await deleteDepense(data.item.id);
				}}>
				<Ionicons name="trash-outline" color={"#FFF"} size={28} />
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
					<View style={{ marginTop: 10, padding: 10 }}>
						<Text>
							Vous n'avez aucune dépense. Et si vous ajoutiez votre première ?
						</Text>
					</View>
				)}

				{depenses && depenses.length > 0 && (
					<SwipeListView
						useFlatList={true}
						data={depenses}
						renderItem={renderDepense}
						renderHiddenItem={renderSwipeButtons}
						keyExtractor={(item) => item.id}
						rightOpenValue={-150}
						disableRightSwipe={true}
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

	backButtonLeft: {
		backgroundColor: "blue",
		right: 75,
	},

	backButtonRight: {
		backgroundColor: "red",
		right: 0,
	},
});

export default DepensesCategorie;
