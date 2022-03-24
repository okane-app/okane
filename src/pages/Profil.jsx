import {
	Image,
	Modal,
	Pressable,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import { signOut, updateProfile } from "firebase/auth";

import { CommonActions } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { StatusBar } from "expo-status-bar";
import { auth } from "../../firebase";
import { useState } from "react";

const Profil = ({ navigation }) => {
	const [modalVisible, setModalVisible] = useState(false);
	const [pseudo, setPseudo] = useState("");

	const changerPseudo = (pseudo) => {
		updateProfile(auth.currentUser, {
			displayName: pseudo,
		}).then(() => setModalVisible(!modalVisible));
	};

	const logout = async () => {
		await signOut(auth);
		navigation.dispatch(
			CommonActions.reset({
				index: 0,
				routes: [{ name: "GuestStack" }],
			})
		);
	};

	return (
		<View style={styles.container}>
			<View style={{ alignSelf: "center", marginTop: 24 }}>
				<View style={styles.profileImage}>
					<Image
						source={require("../../assets/profile.png")}
						style={styles.image}></Image>
				</View>
			</View>

			<View style={styles.infoContainer}>
				<Text style={[styles.text, { fontWeight: "200", fontSize: 36 }]}>
					{auth.currentUser?.displayName}
				</Text>
			</View>

			<View style={styles.accountMenuBox}>
				<Modal
					animationType="slide"
					transparent={true}
					visible={modalVisible}
					onRequestClose={() => {
						setModalVisible(!modalVisible);
					}}>
					<View style={styles.centeredView}>
						<View style={styles.modalView}>
							<TextInput
								style={styles.input}
								onChangeText={setPseudo}
								placeholder="Pseudo"
								value={pseudo}
							/>
							<View style={styles.modalButton}>
								<Pressable
									style={[styles.button, styles.buttonClose]}
									onPress={() => changerPseudo(pseudo)}>
									<Text style={styles.textStyle}>Appliquer</Text>
								</Pressable>
								<Pressable
									style={[styles.button, styles.buttonClose]}
									onPress={() => setModalVisible(!modalVisible)}>
									<Text style={styles.textStyle}>Annuler</Text>
								</Pressable>
							</View>
						</View>
					</View>
				</Modal>

				<TouchableOpacity onPress={() => setModalVisible(true)}>
					<View style={styles.accountMenuItem}>
						<View style={styles.accountMenuTextBox}>
							<Ionicons name="pencil-outline" style={styles.accountMenuIcon} />
							<Text style={styles.accountMenuText}>Changer de pseudo</Text>
						</View>
					</View>
				</TouchableOpacity>

				<TouchableOpacity>
					<View style={styles.accountMenuItem}>
						<View style={styles.accountMenuTextBox}>
							<Ionicons
								name="settings-outline"
								style={styles.accountMenuIcon}
							/>
							<Text style={styles.accountMenuText}>Paramètres</Text>
						</View>
					</View>
				</TouchableOpacity>

				<TouchableOpacity onPress={logout}>
					<View style={styles.accountMenuItem}>
						<View style={styles.accountMenuTextBox}>
							<Ionicons name="log-out-outline" style={styles.accountMenuIcon} />
							<Text style={styles.accountMenuText}>Déconnexion</Text>
						</View>
					</View>
				</TouchableOpacity>
			</View>
			<StatusBar style="auto" />
		</View>
	);
};

export default Profil;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#FFF",
	},
	text: {
		color: "#52575D",
	},
	image: {
		flex: 1,
		height: undefined,
		width: undefined,
	},
	profileImage: {
		width: 250,
		height: 250,
		borderRadius: 100,
		overflow: "hidden",
	},
	infoContainer: {
		alignSelf: "center",
		alignItems: "center",
	},
	accountMenuBox: {
		marginTop: 30,
	},
	accountMenuItem: {
		height: 50,
		flexDirection: "row",
		alignItems: "center",
	},
	accountMenuIcon: {
		marginLeft: 15,
		marginRight: 15,
	},
	accountMenuTextBox: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		paddingLeft: 10,
		paddingRight: 10,
	},
	accountMenuText: {
		fontSize: 16,
		fontWeight: "500",
	},
	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 22,
	},
	modalView: {
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
	modalButton: {
		alignItems: "center",
		flexDirection: "row",
	},
	button: {
		borderRadius: 20,
		padding: 10,
		elevation: 2,
	},
	buttonClose: {
		backgroundColor: "#2196F3",
	},
	input: {
		height: 40,
		margin: 12,
		borderWidth: 1,
		padding: 10,
	},
});
