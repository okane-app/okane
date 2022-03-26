import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NouvelleDepense from "../pages/NouvelleDepense";
import NouvelleCategorie from "../pages/NouvelleCategorie";
import AllCategorie from "../pages/AllCategorie";

const Stack = createNativeStackNavigator();

const DepenseTab = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen name="NouvelleDepense" component={NouvelleDepense} />
			<Stack.Screen name="NouvelleCategorie" component={NouvelleCategorie} />
			<Stack.Screen name="AllCategorie" component={AllCategorie} />
		</Stack.Navigator>
	);
};

export default DepenseTab;
