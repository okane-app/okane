import { StyleSheet, Text, View } from "react-native";

import { StatusBar } from "expo-status-bar";
import { auth } from "../../firebase";

const Dashboard = ({ navigation }) => {
	return (
		<View style={styles.container}>
			<Text>Dashboard</Text>
			<Text>{auth.currentUser?.uid}</Text>
			<StatusBar style="auto" />
		</View>
	);
};

export default Dashboard;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
