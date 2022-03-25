import { FlatList, StyleSheet, Text, View, TouchableHighlight } from "react-native";
import { auth, db } from "../../firebase";
import { collection, deleteDoc, query,doc } from "firebase/firestore";
import Icon from 'react-native-vector-icons/FontAwesome';
import { StatusBar } from "expo-status-bar";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { SwipeListView } from 'react-native-swipe-list-view';

const allCategorie = ({ navigation }) => {
	const user = auth.currentUser;
	const usersCollectionRef = collection(db, "users", user.uid, "categories");

	const [categories, loading, error] = useCollectionData(
		query(
			collection(db, "users", user.uid, "categories"),

		)
	);

	const supprimer = async () => {
		await deleteDoc(doc(db,{categories}))
	}

	const renderCategorie = ({ item }) => (

		<View

			style={{
				flexDirection: "row",
				justifyContent: "space-between",
				width: 300,
			}}>
			<TouchableHighlight onPress={() => { supprimer();}}>
				<Icon name="close" size={16} />
			</TouchableHighlight>
			<Text style={styles.depense}>{item.nom}</Text>

		</View>

	);

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Vos Catégories</Text>
			{categories && (
				<FlatList
					style={styles.depenses}
					data={categories}
					renderItem={renderCategorie}
					keyExtractor={(item) => item.nom}

				/>

			)}


			{loading && <Text>Chargement de vos dernières catégorie</Text>}
			{error && <Text>Erreur : {JSON.stringify(error)}</Text>}
			<StatusBar style="auto" />


		</View>
	);
};

export default allCategorie;

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