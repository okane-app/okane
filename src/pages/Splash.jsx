import {
	Image,
	StyleSheet,
	Text,
	TouchableWithoutFeedback,
	View,
} from "react-native";

import { StatusBar } from "expo-status-bar";

const Splash = ({ navigation }) => {
	return (
		<View style={styles.container}>
			<Image style={styles.logo} source={require("../../assets/okane.png")} />
			<Text style={styles.motto}>Ne dépense plus jamais de trop.</Text>

			<View style={styles.buttons}>
				<TouchableWithoutFeedback
					onPress={() => navigation.navigate("Connexion")}>
					<View style={[styles.button, styles.buttonLogin]}>
						<Text style={styles.buttonText}>Connexion</Text>
					</View>
				</TouchableWithoutFeedback>

				<TouchableWithoutFeedback
					onPress={() => navigation.navigate("Inscription")}>
					<View style={[styles.button, styles.buttonRegister]}>
						<Text style={styles.buttonText}>Inscription</Text>
					</View>
				</TouchableWithoutFeedback>
			</View>

			<Text style={styles.version}>Version 1.0.0a</Text>

			<StatusBar style="auto" />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#5DB075",
		alignItems: "center",
		justifyContent: "center",
	},

	logo: {
		width: 350,
		height: 350,
	},

	motto: {
		color: "white",
		fontSize: 30,
		fontWeight: "600",
		marginLeft: 10,
	},

	buttons: {
		alignSelf: "stretch",
		marginLeft: 16,
		marginRight: 16,
	},

	button: {
		alignItems: "center",
		paddingTop: 16,
		paddingBottom: 16,
		borderRadius: 100,

		shadowColor: "#000",
		shadowOffset: {
			width: 4,
			height: 4,
		},
		shadowOpacity: 0.25,
		shadowRadius: 1,
	},

	buttonLogin: {
		marginTop: 56,
		backgroundColor: "#4B9460",
	},

	buttonRegister: {
		marginTop: 12,
		backgroundColor: "#74CA8D",
	},

	buttonText: {
		color: "white",
		fontSize: 16,
		fontWeight: "600",
	},

	version: { marginTop: 100, color: "white", fontSize: 14 },
});

export default Splash;
