import {
	Dimensions,
	StyleSheet,
	Text,
	TouchableHighlight,
	TouchableOpacity,
	View,
} from "react-native";
import { auth, db } from "../../firebase";
import {
	collection,
	deleteDoc,
	doc,
	getDocs,
	query,
	where,
} from "firebase/firestore";

import Ionicons from "react-native-vector-icons/Ionicons";
import JaugeDepenses from "../components/JaugeDepenses";
import { LineChart } from "react-native-chart-kit";
import { StatusBar } from "expo-status-bar";
import { SwipeListView } from "react-native-swipe-list-view";
import Swiper from "react-native-swiper";
import { useCollectionData } from "react-firebase-hooks/firestore";

// function that returns date of last day of previous month
const previousMonth = () => {
	const date = new Date();
	date.setDate(0);
	date.setHours(23);
	date.setMinutes(59);
	date.setSeconds(59);
	date.setMilliseconds(999);
	return date;
};

// function that returns date of first day of next month
const nextMonth = () => {
	const date = new Date();
	date.setDate(1);
	date.setMonth(date.getMonth() + 1);
	date.setHours(0);
	date.setMinutes(0);
	date.setSeconds(0);
	date.setMilliseconds(0);
	return date;
};

const Depenses = ({ navigation }) => {
	const user = auth.currentUser;

	const [categories, loadingCategories, errorCategories] = useCollectionData(
		query(collection(db, "users", user.uid, "categories"))
	);

	const [depenses] = useCollectionData(
		query(collection(db, "users", user.uid, "depenses"))
	);

	// Jauge circulaire

	const budgetMax = () => {
		const tmp = categories.reduce(
			(total, categorie) => total + categorie.limite,
			0
		);
		return tmp;
	};

	const depensesTotales = () => {
		const p = previousMonth();
		const n = nextMonth();

		return depenses
			.filter((depense) => {
				const d = depense.date.toDate();
				d.setMilliseconds(0);

				return d > p && d < n;
			})
			.reduce((total, depense) => total + depense.montant, 0);
	};

	const dpt = depenses ? depensesTotales() : 0;
	const max = categories ? budgetMax() : 0;
	const pourcentage =
		depenses && categories && depenses.length > 0
			? Math.round((depensesTotales() / budgetMax()) * 100)
			: 0;

	// Graphique

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
				color: (opacity = 1) => `rgba(75, 161, 68, ${opacity})`,
				strokeWidth: 2,
			},
		],
	};

	const chartConfig = {
		backgroundGradientFrom: "#fff",
		backgroundGradientFromOpacity: 0,
		backgroundGradientTo: "#fff",
		backgroundGradientToOpacity: 0.5,
		color: (opacity = 1) => `rgba(75, 161, 68, ${opacity})`,
		strokeWidth: 2,
		barPercentage: 0.5,
		useShadowColorFromDataset: false,
		propsForDots: {
			r: "3",
			strokeWidth: "3",
		},
	};

	// Liste des catégories

	const renderCategorie = ({ item }) => {
		const sommeDepensesCategorie = depenses
			? depenses
					.filter((depense) => depense.categorie === item.id)
					.reduce((total, depense) => total + depense.montant, 0)
			: 0;

		return (
			<TouchableHighlight
				style={styles.categorie}
				underlayColor="#f5f5f5"
				onPress={() => {
					navigation.navigate("DepensesCategorie", {
						categorie: item.id,
						title: item.nom,
					});
				}}>
				<>
					<Text style={{ fontSize: 16, paddingLeft: 10 }}>{item.nom}</Text>
					<Text style={{ fontSize: 16, paddingRight: 10 }}>
						{sommeDepensesCategorie} € / {item.limite} €
					</Text>
				</>
			</TouchableHighlight>
		);
	};

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
					await deleteCategorie(data.item.id);
				}}>
				<Ionicons name="trash-outline" color={"#FFF"} size={28} />
			</TouchableOpacity>
		</View>
	);

	const deleteCategorie = async (id) => {
		// Suppression de la catégorie
		await deleteDoc(doc(db, "users", user.uid, "categories", id));

		// Suppression des dépenses de la catégorie
		const depenses = await getDocs(
			query(
				collection(db, "users", user.uid, "depenses"),
				where("categorie", "==", id.toString())
			)
		);
		depenses.forEach(async (depense) => {
			await deleteDoc(doc(db, "users", user.uid, "depenses", depense.id));
		});
	};

	return (
		<View style={styles.container}>
			<Swiper
				dot={<View style={styles.dot} />}
				activeDot={<View style={styles.activeDot} />}
				loop={false}>
				{/* Jauge circulaire de dépenses */}
				<View
					style={[
						styles.semi,
						styles.container,
						{ backgroundColor: "#5BB774" },
					]}>
					<JaugeDepenses dpt={dpt} max={max} pourcentage={pourcentage} />
				</View>

				{/* Graphique */}
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
				{categories && (
					<SwipeListView
						useFlatList={true}
						data={categories}
						renderItem={renderCategorie}
						renderHiddenItem={renderSwipeButtons}
						keyExtractor={(item) => item.id}
						rightOpenValue={-150}
						disableRightSwipe={true}
					/>
				)}

				{loadingCategories && (
					<View style={styles.container}>
						<Text>Chargement de vos catégories...</Text>
					</View>
				)}

				{errorCategories && (
					<View style={styles.container}>
						<Text>Erreur : {JSON.stringify(error)}</Text>
					</View>
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

	semi: { flex: 1, alignSelf: "stretch" },

	slide2: {
		flex: 1,
		justifyContent: "center",
		backgroundColor: "#fff",
	},

	// Swiper

	dot: {
		backgroundColor: "rgba(60,60,60,.3)",
		width: 10,
		height: 10,
		borderRadius: 7,
		marginLeft: 7,
		marginTop: 20,
	},

	activeDot: {
		backgroundColor: "#000",
		width: 10,
		height: 10,
		borderRadius: 7,
		marginLeft: 7,
		marginTop: 7,
		marginTop: 20,
	},

	// Catégories

	categorie: {
		flexDirection: "row",
		minWidth: "60%",
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

export default Depenses;
