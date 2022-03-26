import { StyleSheet, Text, View } from "react-native";

import { StatusBar } from "expo-status-bar";

const NouvelleDepense = () => {
	return (
		<View style={styles.container}>
			<Text>Nouvelle dépense</Text>

			<StatusBar style="auto" />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "white",
	},
});

export default NouvelleDepense;
