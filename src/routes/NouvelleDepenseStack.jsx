import NouvelleCategorie from "../pages/NouvelleCategorie";
import NouvelleDepense from "../pages/NouvelleDepense";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const NouvelleDepenseStack = () => (
	<Stack.Navigator screenOptions={{ headerTitleAlign: "center" }}>
		<Stack.Screen
			name="NouvelleDepense"
			component={NouvelleDepense}
			options={{ title: "Nouvelle dépense" }}
		/>
		<Stack.Screen
			name="NouvelleCategorie"
			component={NouvelleCategorie}
			options={{ title: "Nouvelle catégorie" }}
		/>
	</Stack.Navigator>
);

export default NouvelleDepenseStack;
