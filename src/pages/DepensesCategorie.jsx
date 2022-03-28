import { FlatList, StyleSheet, Text, View } from "react-native";
import { auth, db } from "../../firebase";
import { collection, orderBy, query, where } from "firebase/firestore";

import { StatusBar } from "expo-status-bar";
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

	return (
		<View style={styles.container}>
			<View style={styles.depenses}>
				<FlatList
					data={depenses}
					renderItem={renderDepense}
					keyExtractor={(item, index) => index}
					ListEmptyComponent={() => (
						<View style={styles.container}>
							<Text style={{ marginTop: 20 }}>
								Vous n'avez aucune dépense. Et si vous ajoutiez votre première ?
							</Text>
						</View>
					)}
				/>
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
});

export default DepensesCategorie;
