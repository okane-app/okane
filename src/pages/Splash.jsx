import { Button, StyleSheet, Text, View } from "react-native";

import { StatusBar } from "expo-status-bar";

const Splash = ({ navigation }) => {
	return (
		<View style={styles.container}>
			<Text>Hello, World!</Text>
			<Button
				title="Connexion"
				onPress={() => navigation.navigate("Connexion")}
			/>
			<Button
				title="Inscription"
				onPress={() => navigation.navigate("Inscription")}
			/>
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
});

export default Splash;
