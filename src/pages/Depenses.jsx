import { StyleSheet, Text, View } from "react-native";

import { StatusBar } from "expo-status-bar";

const Depenses = () => {
	return (
		<View style={styles.container}>
			<Text>Dépenses</Text>

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

export default Depenses;
