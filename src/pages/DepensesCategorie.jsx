import { FlatList, StyleSheet, Text, View } from "react-native";
import { auth, db } from "../../firebase";
import { collection, limit, orderBy, query,where } from "firebase/firestore";

import { StatusBar } from "expo-status-bar";
import { useCollectionData } from "react-firebase-hooks/firestore";

const DepensesCategorie = ({ route, navigation }) => {
	const user = auth.currentUser;

	const { idCategorie, nomCateg } = route.params;

	const [depenses, loading, error] = useCollectionData(
		query(
			collection(db, "users", user.uid, "depenses"),
            where("categorie","==",idCategorie.toString())
		)
	);

	const renderDepense = ({ item }) => (
		<View
			style={{
				flexDirection: "row",
				justifyContent: "space-between",
				width: 300,
			}}>
			<Text style={styles.depense}>{item.nom}</Text>
			<Text style={styles.depense}>{item.montant} €</Text>
		</View>
	);

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Depense de la catégorie {nomCateg}</Text>
			{depenses && (
				<FlatList
					style={styles.depenses}
					data={depenses}
					renderItem={renderDepense}
					keyExtractor={(item) => item.nom}
				/>
			)}
			{loading && <Text>Chargement de vos dernières dépenses...</Text>}
			{error && <Text>Erreur : {JSON.stringify(error)}</Text>}
			<StatusBar style="auto" />
		</View>
	);
};

export default DepensesCategorie;

const styles = StyleSheet.create({
	container: {
		padding: 30,
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},

	title: {
		fontSize: 24,
		fontWeight: "bold",
		alignSelf: "flex-start",
	},

	depenses: {
		marginTop: 10,
	},

	depense: {
		fontSize: 16,
	},
});