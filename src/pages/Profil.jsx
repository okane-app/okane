import { Button, StyleSheet, View } from "react-native";

import { CommonActions } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";

const Profil = ({ navigation }) => {
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
			<Button title="Déconnexion" onPress={logout} />
			<StatusBar style="auto" />
		</View>
	);
};

export default Profil;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
