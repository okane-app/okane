import { FlatList, StyleSheet, Text, View } from "react-native";
import { collection, orderBy, query } from "firebase/firestore";
import {
	useCollectionData,
	useCollectionDataOnce,
} from "react-firebase-hooks/firestore";

import { StatusBar } from "expo-status-bar";
import { db } from "../../firebase";

const Conseils = () => {
	// const user = auth.currentUser;

	const [messages, loadingMessages, errorMessages] = useCollectionData(
		query(collection(db, "messages"), orderBy("timestamp", "desc"))
	);

	// once?
	const [users, loadingUsers, errorUsers] = useCollectionDataOnce(
		collection(db, "users")
	);

	const getUsername = (uid) => {
		if (users) {
			const user = users.find((user) => user.uid === uid);
			return user ? "- " + user.username : "- Utilisateur supprimé";
		} else {
			return "Chargement...";
		}
	};

	const renderMessage = ({ item }) => (
		<View style={styles.message}>
			<Text style={styles.messageContent}>{item.content}</Text>
			<Text style={styles.messageAuthor}>{getUsername(item.uid)}</Text>
		</View>
	);

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Vos conseils</Text>

			<FlatList
				style={styles.chat}
				data={messages}
				renderItem={renderMessage}
				keyExtractor={(item, index) => index}
			/>

			<StatusBar style="light" />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		backgroundColor: "#5BB774",
	},

	title: {
		color: "white",
		fontSize: 30,
		fontWeight: "600",
		marginTop: 100,
	},

	chat: {
		flex: 1,
		marginTop: 40,
	},

	message: {
		backgroundColor: "white",
		padding: 20,
		width: 350,
		borderRadius: 10,
		marginBottom: 10,
	},

	messageAuthor: {
		color: "gray",
	},
});

export default Conseils;
