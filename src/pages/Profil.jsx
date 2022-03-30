import * as ImagePicker from "expo-image-picker";

import {
	Alert,
	Image,
	Platform,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { auth, db, storage } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { signOut, updateProfile } from "firebase/auth";

import Dialog from "react-native-dialog";
import Ionicons from "react-native-vector-icons/Ionicons";
import { StatusBar } from "expo-status-bar";
import { showMessage } from "react-native-flash-message";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { useState } from "react";

const Profil = () => {
	const [modalVisible, setModalVisible] = useState(false);

	const [pseudo, setPseudo] = useState("");
	const [photoURL, setPhotoURL] = useState(null);

	const [easterEgg, setEasterEgg] = useState(0);

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
				onPress: async (pseudo) => {
					await changerPseudo(pseudo);
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

		if (result.cancelled) return;

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
		if (pseudo.trim().length === 0) {
			showMessage({
				message: "Veuillez entrer un pseudo",
				type: "danger",
			});
			return;
		}

		if (pseudo.length > 20) {
			showMessage({
				message: "Votre pseudo ne doit pas dépasser 20 caractères",
				type: "danger",
			});
			return;
		}

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

	const checkEasterEgg = async () => {
		setEasterEgg(easterEgg + 1);
		if (easterEgg === 4) {
			const downloadURL = await getDownloadURL(
				ref(storage, `images/profile/easterEgg.png`)
			);
			await updateProfile(auth.currentUser, {
				photoURL: downloadURL,
			});
			setPhotoURL(downloadURL);

			showMessage({
				message: "Un bon bain est un bon bain d'or !",
				type: "warning",
				duration: 5000,
			});

			setEasterEgg(0);
		}
	};

	const { showActionSheetWithOptions } = useActionSheet(); // Menu changer photo

	return (
		<View style={styles.container}>
			<TouchableOpacity
				onPress={() => {
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
							source={require("../assets/profile.png")}
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
			</TouchableOpacity>

			<View>
				<Text style={styles.username}>@{auth.currentUser.displayName}</Text>
			</View>

			<View style={styles.menu}>
				<TouchableOpacity onPress={() => setModalVisible(true)}>
					<View style={[styles.menuAction, styles.menuActionBorder]}>
						<Ionicons name="pencil-outline" style={styles.menuIcon} size={15} />
						<Text style={styles.menuText}>Changer de pseudo</Text>
					</View>
				</TouchableOpacity>

				<TouchableOpacity onPress={() => checkEasterEgg()}>
					<View style={[styles.menuAction, styles.menuActionBorder]}>
						<Ionicons
							name="settings-outline"
							style={styles.menuIcon}
							size={15}
						/>
						<Text style={styles.menuText}>Paramètres</Text>
					</View>
				</TouchableOpacity>

				<TouchableOpacity onPress={logout}>
					<View style={styles.menuAction}>
						<Ionicons
							name="log-out-outline"
							style={styles.menuIcon}
							size={15}
						/>
						<Text style={styles.menuText}>Déconnexion</Text>
					</View>
				</TouchableOpacity>
			</View>

			{platform === "android" && (
				<Dialog.Container
					visible={modalVisible}
					onBackdropPress={() => {
						setModalVisible(false);
					}}>
					<Dialog.Title>Changer de pseudo</Dialog.Title>
					<Dialog.Input
						placeholder="Nouveau pseudo"
						onChangeText={setPseudo}
						maxLength={20}
					/>
					<Dialog.Button
						label="Annuler"
						onPress={() => setModalVisible(false)}
					/>
					<Dialog.Button
						label="Confirmer"
						onPress={async () => {
							await changerPseudo(pseudo);
							setModalVisible(!modalVisible);
						}}
					/>
				</Dialog.Container>
			)}

			<StatusBar style="auto" />
		</View>
	);
};

const styles = StyleSheet.create({
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
});

export default Profil;
