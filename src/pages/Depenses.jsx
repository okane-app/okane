import { FlatList, StyleSheet, Text, View } from "react-native";
import { auth, db } from "../../firebase";
import { collection, limit, orderBy, query } from "firebase/firestore";

import CircularProgress from "react-native-circular-progress-indicator";
import { StatusBar } from "expo-status-bar";
import { useCollectionData } from "react-firebase-hooks/firestore";

const Depenses = ({ navigation }) => {
	const user = auth.currentUser;

	const [depensesRecente, loading, error] = useCollectionData(
		query(collection(db, "users", user.uid, "depenses"))
	);

	const [categories, loadingCategories, errorCategories] = useCollectionData(
		query(collection(db, "users", user.uid, "categories"))
	);

	const [depenses, loadingDepenses, errorDepenses] = useCollectionData(
		query(collection(db, "users", user.uid, "depenses"))
	);

	const budgetMax = () => {
		const tmp = categories.reduce(
			(total, categorie) => total + categorie.limite,
			0
		);
		return tmp;
	};

	const depensesTotales = () => {
		const tmp = depenses.reduce((total, depense) => total + depense.montant, 0);
		return tmp;
	};

	const renderCategorie = ({ item }) => (
		<View style={styles.depense}>
			{/* <Text style={styles.depense}>
					<Ionicons name={icon} />
				</Text> */}
			<Text style={{ fontSize: 16 }}>{item.nom}</Text>
			<Text style={{ fontSize: 16 }}>{item.limite} €</Text>
		</View>
	);

	const dpt = depenses ? depensesTotales() : 0;
	const max = categories ? budgetMax() : 0;

	return (
		<View style={styles.container}>
			<View
				style={[styles.semi, styles.container, { backgroundColor: "#5BB774" }]}
			>
				{depenses && (
					<CircularProgress
						value={dpt}
						radius={120}
						duration={2000}
						textColor={"#ecf0f1"}
						maxValue={max}
						title={"EUROS"}
						titleColor={"white"}
						titleStyle={{ fontWeight: "bold" }}
					/>
				)}
			</View>

			<View style={styles.semi}>
				<View style={styles.dernieresDepenses}>
					{depensesRecente && depensesRecente.length === 0 && (
						<View style={styles.container}>
							<Text>
								Vous n'avez aucune dépense. Et si vous ajoutiez votre première ?
							</Text>
						</View>
					)}

					{categories && (
						<FlatList
							style={styles.listeDepenses}
							data={categories}
							renderItem={renderCategorie}
							keyExtractor={(item) => item.nom}
						/>
					)}

					{loadingCategories && (
						<View style={styles.container}>
							<Text>Chargement de vos dépenses...</Text>
						</View>
					)}

					{errorCategories && (
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

export default Depenses;

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
		flex: 1,
		paddingLeft: 20, // 16 avec icône couleur
		paddingRight: 20, // 16
	},

	listeDepenses: {
		marginTop: 5,
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
