import {
	Dimensions,
	FlatList,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { auth, db } from "../../firebase";
import { collection, query, where } from "firebase/firestore";

import { LineChart } from "react-native-chart-kit";
import { StatusBar } from "expo-status-bar";
import Swiper from "react-native-swiper/src";
import { useCollectionData } from "react-firebase-hooks/firestore";

const Depenses = () => {
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
		<TouchableOpacity style={styles.depense}>
			<Text style={{ fontSize: 16 }}>{item.nom}</Text>
			<Text style={{ fontSize: 16 }}>{item.limite} €</Text>
		</TouchableOpacity>
	);

	const dpt = depenses ? depensesTotales() : 0;
	const max = categories ? budgetMax() : 0;

	const mois = [
		"Janv",
		"Févr",
		"Mars",
		"Avr",
		"Mai",
		"Juin",
		"Juill",
		"Août",
		"Sept",
		"Oct",
		"Nov",
		"Déc",
	];

	const calculerSixDerniersMois = () => {
		const six = [];
		const d = new Date();

		for (let i = 1; i <= 6; i++) {
			const tmp = d.getMonth() - i;
			if (tmp < 0) {
				six.push(tmp + 12);
			} else {
				six.push(tmp);
			}
		}
		return six.reverse();
	};

	const sixDerniersMois = calculerSixDerniersMois();
	const sixDerniersMoisLabels = sixDerniersMois.map((noMois) => mois[noMois]);

	const sommeSixDerniersMois = sixDerniersMois.map((noMois) => {
		if (depenses) {
			return depenses
				.filter((depense) => depense?.date.toDate().getMonth() === noMois)
				.reduce((total, depense) => total + depense?.montant, 0);
		} else {
			return 0;
		}
	});

	const data = {
		labels: sixDerniersMoisLabels,
		datasets: [
			{
				data: sommeSixDerniersMois,
				color: (opacity = 1) => `rgba(75, 161, 68, ${opacity})`, // optional
				strokeWidth: 2, // optional
			},
		],
	};

	const chartConfig = {
		backgroundGradientFrom: "#fff",
		backgroundGradientFromOpacity: 0,
		backgroundGradientTo: "#fff",
		backgroundGradientToOpacity: 0.5,
		color: (opacity = 1) => `rgba(75, 161, 68, ${opacity})`,
		strokeWidth: 2, // optional, default 3
		barPercentage: 0.5,
		useShadowColorFromDataset: false, // optional
		propsForDots: {
			r: "3",
			strokeWidth: "3",
		},
	};

	return (
		<View style={styles.container}>
			<Swiper
				dot={
					<View
						style={{
							backgroundColor: "rgba(60,60,60,.3)",
							width: 10,
							height: 10,
							borderRadius: 7,
							marginLeft: 7,
							marginTop: 20,
						}}
					/>
				}
				activeDot={
					<View
						style={{
							backgroundColor: "#000",
							width: 10,
							height: 10,
							borderRadius: 7,
							marginLeft: 7,
							marginTop: 7,
							marginTop: 20,
						}}
					/>
				}
				loop={false}>
				<View
					style={[
						styles.semi,
						styles.container,
						{ backgroundColor: "#5BB774" },
					]}>
					{/* Camembert */}
				</View>
				<View style={styles.slide2}>
					<LineChart
						data={data}
						width={Dimensions.get("window").width}
						height={256}
						verticalLabelRotation={30}
						chartConfig={chartConfig}
						bezier
					/>
				</View>
			</Swiper>

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

	slide2: {
		flex: 1,
		justifyContent: "center",
		backgroundColor: "#fff",
	},

	text: {
		color: "#fff",
		fontSize: 30,
		fontWeight: "bold",
	},
});

export default Depenses;
