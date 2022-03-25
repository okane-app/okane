import * as ImagePicker from "expo-image-picker";

import {
	Alert,
	Image,
	Modal,
	Platform,
	Pressable,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View,
} from "react-native";
import { auth, db, storage } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { signOut, updateProfile } from "firebase/auth";

import Ionicons from "react-native-vector-icons/Ionicons";
import { StatusBar } from "expo-status-bar";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { useState } from "react";

const Profil = () => {
	const [modalVisible, setModalVisible] = useState(false);

	const [pseudo, setPseudo] = useState(auth.currentUser?.displayName);
	const [photoURL, setPhotoURL] = useState(null);

	const platform = Platform.OS;

	// Utilise le modal d'alerte natif pour iOS
	if (platform === "ios" && modalVisible) {
		Alert.prompt("Changer de pseudo", "", [
			{
				text: "Annuler",
				onPress: () => setModalVisible(false),
				style: "cancel",
			},
			{
				text: "Confirmer",
				onPress: (pseudo) => {
					changerPseudo(pseudo);
					setModalVisible(!modalVisible);
				},
			},
		]);
	}

	const changerPhoto = async () => {
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: "Images",
			allowsEditing: true,
		});

		// Référence de l'image
		const newImageRef = ref(
			storage,
			`images/profile/${auth.currentUser.uid}.png`
		);

		// Conversion de l'image en bytes
		const r = await fetch(result.uri);
		const blob = await r.blob();

		await uploadBytesResumable(newImageRef, blob);

		const downloadURL = await getDownloadURL(newImageRef);
		await updateProfile(auth.currentUser, {
			photoURL: downloadURL,
		});

		setPhotoURL(downloadURL);
	};

	const changerPseudo = async (pseudo) => {
		// Met à jour le pseudo interne de l'utilisateur
		await updateProfile(auth.currentUser, {
			displayName: pseudo,
		});
		// Met à jour le pseudo dans la base de données
		await updateDoc(doc(db, "users", auth.currentUser.uid), {
			username: pseudo,
		});

		setPseudo(pseudo);
	};

	if (!photoURL && auth.currentUser.photoURL) {
		setPhotoURL(auth.currentUser.photoURL);
	}

	const logout = async () => {
		await signOut(auth);
	};

	const { showActionSheetWithOptions } = useActionSheet(); // Menu changer photo

	return (
		<View style={styles.container}>
			<TouchableWithoutFeedback
				onLongPress={() => {
					showActionSheetWithOptions(
						{
							options: ["Changer de photo de profil", "Annuler"],
							cancelButtonIndex: 1,
						},
						async (index) => {
							if (index === 0) {
								changerPhoto();
							}
						}
					);
				}}>
				<View style={styles.profileImage}>
					{!photoURL && (
						<Image
							source={require("../../assets/profile.png")}
							style={styles.image}
							resizeMode="cover"
						/>
					)}
					{photoURL && (
						<Image
							source={{ uri: photoURL }}
							style={styles.image}
							resizeMode="cover"
						/>
					)}
				</View>
			</TouchableWithoutFeedback>

			<View>
				<Text style={styles.username}>@{pseudo}</Text>
			</View>

			<View style={styles.menu}>
				{platform === "android" && (
					<Modal
						animationType="slide"
						transparent={true}
						visible={modalVisible}
						onRequestClose={() => {
							setModalVisible(!modalVisible);
						}}>
						<View style={styles.modal}>
							<TextInput
								style={styles.modalInput}
								onChangeText={setPseudo}
								placeholder="Pseudo"
								value={pseudo}
							/>
							<View style={styles.modalButtons}>
								<Pressable
									style={[styles.modalButton, styles.modalButtonClose]}
									onPress={() => {
										changerPseudo(pseudo);
										setModalVisible(!modalVisible);
									}}>
									<Text>Appliquer</Text>
								</Pressable>
								<Pressable
									style={[styles.modalButton, styles.modalButtonClose]}
									onPress={() => setModalVisible(!modalVisible)}>
									<Text>Annuler</Text>
								</Pressable>
							</View>
						</View>
					</Modal>
				)}

				<TouchableOpacity onPress={() => setModalVisible(true)}>
					<View style={[styles.menuAction, styles.menuActionBorder]}>
						<Ionicons name="pencil-outline" style={styles.menuIcon} />
						<Text style={styles.menuText}>Changer de pseudo</Text>
					</View>
				</TouchableOpacity>

				<TouchableOpacity>
					<View style={[styles.menuAction, styles.menuActionBorder]}>
						<Ionicons name="settings-outline" style={styles.menuIcon} />
						<Text style={styles.menuText}>Paramètres</Text>
					</View>
				</TouchableOpacity>

				<TouchableOpacity onPress={logout}>
					<View style={styles.menuAction}>
						<Ionicons name="log-out-outline" style={styles.menuIcon} />
						<Text style={styles.menuText}>Déconnexion</Text>
					</View>
				</TouchableOpacity>
			</View>
			<StatusBar style="light" />
		</View>
	);
};

styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#5DB075",
	},

	username: {
		marginTop: 10,
		color: "white",
		fontSize: 36,
		fontWeight: "300",
	},

	image: {
		flex: 1,
		height: undefined,
		width: undefined,
	},

	profileImage: {
		width: 250,
		height: 250,
		borderRadius: 250,
		overflow: "hidden",
	},

	menu: {
		marginTop: 35,
		alignSelf: "stretch",
		marginLeft: 30,
		marginRight: 30,
		paddingTop: 5,
		paddingBottom: 5,
		borderWidth: 1,
		borderRadius: 7,
		borderColor: "#E8E8E8",
		backgroundColor: "white",
	},

	menuAction: {
		flexDirection: "row",
		alignSelf: "stretch",
		alignItems: "center",
		marginLeft: 20,
		marginRight: 20,
		paddingTop: 15,
		paddingBottom: 15,
	},

	menuActionBorder: {
		borderBottomWidth: 1,
		borderBottomColor: "#E8E8E8",
	},

	menuIcon: {
		marginLeft: 15,
		marginRight: 15,
	},

	menuText: {
		fontSize: 16,
		fontWeight: "500",
	},

	modal: {
		margin: 20,
		backgroundColor: "white",
		borderRadius: 20,
		padding: 35,
		alignItems: "center",
		shadowColor: "#000",
		backgroundColor: "#EEEE",
		width: 200,
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},

	modalButtons: {
		alignItems: "center",
		flexDirection: "row",
	},

	modalButton: {
		borderRadius: 20,
		padding: 10,
		elevation: 2,
	},

	modalButtonClose: {
		backgroundColor: "#2196F3",
	},

	modalInput: {
		height: 40,
		margin: 12,
		borderWidth: 1,
		padding: 10,
	},
});

export default Profil;
