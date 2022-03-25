import { FlatList, StyleSheet, Text, View } from "react-native";
import { auth, db } from "../../firebase";
import { collection, limit, orderBy, query } from "firebase/firestore";

import { StatusBar } from "expo-status-bar";
import { useCollectionData } from "react-firebase-hooks/firestore";

const Accueil = ({ navigation }) => {
	const user = auth.currentUser;

	const [depenses, loading, error] = useCollectionData(
		query(
			collection(db, "users", user.uid, "depenses"),
			orderBy("date", "desc"),
			limit(4)
		)
	);

	const renderDepense = ({ item }) => (
		<View style={styles.depense}>
			<Text style={{ fontSize: 16 }}>{item.nom}</Text>
			<Text style={{ fontSize: 16 }}>{item.montant} €</Text>
		</View>
	);

	return (
		<View style={styles.container}>
			<View style={[styles.semi, { backgroundColor: "#5BB774" }]}></View>

			<View style={styles.semi}>
				<View style={styles.dernieresDepenses}>
					<Text style={styles.title}>Dernières dépenses</Text>

					{depenses && depenses.length === 0 && (
						<View style={styles.container}>
							<Text>
								Vous n'avez aucune dépense. Et si vous ajoutiez votre première ?
							</Text>
						</View>
					)}

					{depenses && (
						<FlatList
							style={styles.listeDepenses}
							data={depenses}
							renderItem={renderDepense}
							keyExtractor={(item) => item.nom}
						/>
					)}

					{loading && (
						<View style={styles.container}>
							<Text>Chargement de vos dernières dépenses...</Text>
						</View>
					)}

					{error && (
						<View style={styles.container}>
							<Text>Erreur : {JSON.stringify(error)}</Text>
						</View>
					)}
				</View>
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

	semi: { flex: 1, alignSelf: "stretch" },

	title: {
		fontSize: 30,
		fontWeight: "500",
		alignSelf: "flex-start",
	},

	dernieresDepenses: {
		flex: 1,
		paddingTop: 25,
		paddingLeft: 20, // 16 avec icône couleur
		paddingRight: 20, // 16
	},

	listeDepenses: {
		marginTop: 32,
	},

	depense: {
		flexDirection: "row",
		justifyContent: "space-between",
		borderBottomWidth: 1,
		borderBottomColor: "#E8E8E8",
		paddingTop: 16,
		paddingBottom: 16,
	},
});

export default Accueil;
