import {
	FlatList,
	KeyboardAvoidingView,
	Platform,
	StyleSheet,
	Text,
	TextInput,
	TouchableHighlight,
	View,
} from "react-native";
import {
	Timestamp,
	addDoc,
	collection,
	orderBy,
	query,
} from "firebase/firestore";
import { auth, db } from "../../firebase";

import { StatusBar } from "expo-status-bar";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useState } from "react";

const Conseils = () => {
	const user = auth.currentUser;

	const [messages, loadingMessages, errorMessages] = useCollectionData(
		query(collection(db, "messages"), orderBy("timestamp", "asc"))
	);

	const [users, loadingUsers, errorUsers] = useCollectionData(
		collection(db, "users")
	);

	const [inputMessage, setInputMessage] = useState("");

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

	const addMessage = async (message) => {
		await addDoc(collection(db, "messages"), {
			content: message,
			timestamp: Timestamp.now(),
			uid: user.uid,
		});
	};

	return (
		<KeyboardAvoidingView
			style={styles.container}
			behavior={Platform.OS === "ios" ? "padding" : "height"}>
			<View style={styles.main}>
				<Text style={styles.title}>Vos conseils</Text>

				<FlatList
					style={styles.chat}
					data={messages}
					renderItem={renderMessage}
					keyExtractor={(item, index) => index}
				/>
			</View>

			<View style={styles.form}>
				<View style={styles.input}>
					<TextInput
						onChangeText={setInputMessage}
						value={inputMessage}
						placeholder="Partage ton expérience !"
					/>
				</View>
				<TouchableHighlight
					onPress={() => {
						addMessage(inputMessage).then(() => setInputMessage(""));
					}}>
					<View style={styles.button}>
						<Text style={styles.buttonText}>Envoyer</Text>
					</View>
				</TouchableHighlight>
			</View>

			<StatusBar style="light" />
		</KeyboardAvoidingView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		backgroundColor: "#5BB774",
	},

	main: {
		flex: 6,
		width: "100%",
		alignItems: "center",
	},

	title: {
		color: "white",
		fontSize: 30,
		fontWeight: "600",
		marginTop: 100,
	},

	chat: {
		flex: 1,
		alignSelf: "stretch",
		marginTop: 40,
	},

	message: {
		backgroundColor: "white",
		padding: 20,
		borderRadius: 10,
		marginBottom: 10,
		marginLeft: 25,
		marginRight: 25,
	},

	messageContent: {
		fontSize: 14,
	},

	messageAuthor: {
		color: "gray",
	},

	form: {
		flex: 1,
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},

	input: {
		justifyContent: "center",
		width: 285,
		height: 50,
		padding: 10,
		backgroundColor: "white",
		borderRadius: 7,
		marginLeft: 25,
	},

	button: {
		height: 50,
		padding: 10,
		borderRadius: 7,
		backgroundColor: "white",
		justifyContent: "center",
		alignItems: "center",
		marginRight: 25,
	},

	buttonText: {
		fontWeight: "500",
	},
});

export default Conseils;
