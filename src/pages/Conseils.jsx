import {
	FlatList,
	Keyboard,
	KeyboardAvoidingView,
	Platform,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import {
	Timestamp,
	addDoc,
	collection,
	doc,
	orderBy,
	query,
	updateDoc,
} from "firebase/firestore";
import { auth, db } from "../../firebase";

import PropTypes from "prop-types";
import ReactTimeAgo from "react-time-ago";
import { StatusBar } from "expo-status-bar";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useState } from "react";

// Pour affichage des horaires des messages relatifs à l'heure actuelle

function TimeAgo(props) {
	return <ReactTimeAgo {...props} component={Time} />;
}

function Time({ date, verboseDate, tooltip, children, ...rest }) {
	return <Text style={styles.messageSecondary}>{children}</Text>;
}

Time.propTypes = {
	date: PropTypes.instanceOf(Date).isRequired,
	verboseDate: PropTypes.string,
	tooltip: PropTypes.bool.isRequired,
	children: PropTypes.string.isRequired,
};

const Conseils = () => {
	const user = auth.currentUser;

	// TODO Loading and error messages

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
			return user ? "@" + user.username : "Utilisateur supprimé";
		} else {
			return "Chargement...";
		}
	};

	const renderMessage = ({ item }) => {
		const liked = item.likes.includes(user.uid);
		const options = liked ? ["Retirer like", "Annuler"] : ["Like", "Annuler"];

		return (
			<>
				{item.likes.length > 0 && (
					<TouchableOpacity
						onPress={async () => {
							if (liked) {
								await removeLike(item.id);
							} else {
								await like(item.id);
							}
						}}>
						<View style={styles.likes}>
							<Text style={styles.likesText}>💵 {item.likes.length}</Text>
						</View>
					</TouchableOpacity>
				)}

				<TouchableOpacity
					onLongPress={() => {
						showActionSheetWithOptions(
							{
								options: options,
								cancelButtonIndex: 1,
							},
							async (index) => {
								if (index === 0) {
									if (liked) {
										await removeLike(item.id);
									} else {
										await like(item.id);
									}
								}
							}
						);
					}}>
					<View style={styles.message}>
						<Text style={styles.messageContent}>{item.content}</Text>
						<View
							style={{
								flexDirection: "row",
								justifyContent: "space-between",
							}}>
							<Text style={styles.messageSecondary}>
								{getUsername(item.uid)}
							</Text>
							<TimeAgo date={item.timestamp.toDate()} />
						</View>
					</View>
				</TouchableOpacity>
			</>
		);
	};

	const addMessage = async (message) => {
		const ref = await addDoc(collection(db, "messages"), {
			content: message,
			timestamp: Timestamp.now(),
			uid: user.uid,
			likes: [],
		});

		await updateDoc(ref, {
			id: ref.id,
		});
	};

	const like = async (id) => {
		const message = messages.find((message) => message.id === id);
		await updateDoc(doc(db, "messages", message.id), {
			likes: [...message.likes, user.uid],
		});
	};

	const removeLike = async (id) => {
		const message = messages.find((message) => message.id === id);
		await updateDoc(doc(db, "messages", message.id), {
			likes: message.likes.filter((uid) => uid !== user.uid),
		});
	};

	const { showActionSheetWithOptions } = useActionSheet();

	return (
		<KeyboardAvoidingView
			style={styles.container}
			behavior={Platform.OS === "ios" ? "padding" : undefined}>
			<View style={styles.main}>
				<Text style={styles.title}>Vos conseils</Text>

				{messages && (
					<FlatList
						style={styles.chat}
						contentContainerStyle={{
							flex: 1,
							justifyContent: "flex-end",
						}}
						inverted
						data={[...messages].reverse()}
						renderItem={renderMessage}
						keyExtractor={(item, index) => index}
					/>
				)}
			</View>

			<View style={styles.form}>
				<View style={styles.input}>
					<TextInput
						style={{ height: 50 }}
						onChangeText={setInputMessage}
						value={inputMessage}
						placeholder="Partage ton expérience !"
					/>
				</View>
				<TouchableOpacity
					onPress={() => {
						addMessage(inputMessage).then(() => {
							setInputMessage("");
							Keyboard.dismiss();
						});
					}}>
					<View style={styles.button}>
						<Text style={styles.buttonText}>Envoyer</Text>
					</View>
				</TouchableOpacity>
			</View>

			<StatusBar style="auto" />
		</KeyboardAvoidingView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		backgroundColor: "#5DB075",
	},

	main: {
		flex: 10,
		alignSelf: "stretch",
		alignItems: "center",
	},

	title: {
		color: "white",
		fontSize: 30,
		fontWeight: "600",
		marginTop: 60,
	},

	chat: {
		flex: 1,
		alignSelf: "stretch",
		marginTop: 20,
	},

	message: {
		backgroundColor: "white",
		padding: 20,
		borderRadius: 10,
		marginBottom: 8,
		marginLeft: 25,
		marginRight: 25,
	},

	messageContent: {
		fontSize: 14,
	},

	messageSecondary: {
		color: "dimgray",
	},

	likes: {
		alignSelf: "flex-end",
		marginRight: 30,
		marginBottom: 8,
		backgroundColor: "white",
		paddingTop: 2,
		paddingBottom: 2,
		paddingLeft: 5,
		paddingRight: 5,
		borderRadius: 7,
	},

	likesText: {
		fontSize: 16,
		color: "gray",
	},

	form: {
		flex: 1,
		alignSelf: "stretch",
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
