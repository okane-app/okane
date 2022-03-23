import { FlatList, StyleSheet, Text, View } from "react-native";
import { auth, db } from "../../firebase";
import { collection, limit, orderBy, query } from "firebase/firestore";

import Ionicons from "react-native-vector-icons/Ionicons";
import { StatusBar } from "expo-status-bar";
import { useCollectionData } from "react-firebase-hooks/firestore";

const Accueil = ({ navigation }) => {
	const user = auth.currentUser;

	// const [categories] = useCollectionData(
	// 	collection(db, "users", user.uid, "categories")
	// );

	const [depenses, loading, error] = useCollectionData(
		query(
			collection(db, "users", user.uid, "depenses"),
			orderBy("date", "desc"),
			limit(4)
		)
	);

	const renderDepense = ({ item }) => {
		// const icon = categories.find((categorie) => {
		// 	if ()
		// })

		// const icon = "logo-github";

		return (
			<View style={styles.depense}>
				{/* <Text style={styles.depense}>
					<Ionicons name={icon} />
				</Text> */}
				<Text style={{ fontSize: 16 }}>{item.nom}</Text>
				<Text style={{ fontSize: 16 }}>{item.montant} €</Text>
			</View>
		);
	};

	return (
		<View style={styles.container}>
			<View style={[styles.semi, { backgroundColor: "#5BB774" }]}></View>

			<View style={styles.semi}>
				<View style={styles.dernieresDepenses}>
					<Text style={styles.title}>Dernières dépenses</Text>
					{depenses && (
						<FlatList
							style={styles.listeDepenses}
							data={depenses}
							renderItem={renderDepense}
							keyExtractor={(item) => item.nom}
						/>
					)}
					{loading && <Text>Chargement de vos dernières dépenses...</Text>}
					{error && <Text>Erreur : {JSON.stringify(error)}</Text>}
				</View>
			</View>
			<StatusBar style="auto" />
		</View>
	);
};

export default Accueil;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},

	semi: { flex: 1, width: "100%" },

	title: {
		fontSize: 30,
		fontWeight: "500",
		alignSelf: "flex-start",
	},

	dernieresDepenses: {
		alignItems: "center",
		justifyContent: "center",
		paddingTop: 25,
		paddingLeft: 16,
		paddingRight: 16,
	},

	listeDepenses: {
		marginTop: 32,
	},

	depense: {
		flexDirection: "row",
		minWidth: "60%",
		justifyContent: "space-between",
		borderBottomWidth: 1,
		borderBottomColor: "#E8E8E8",
		paddingTop: 16,
		paddingBottom: 16,
	},
});
