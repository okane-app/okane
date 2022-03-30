import Depenses from "../pages/Depenses";
import DepensesCategorie from "../pages/DepensesCategorie";
import ModifierCategorie from "../pages/ModifierCategorie";
import ModifierDepense from "../pages/ModifierDepense";
import NouvelleCategorie from "../pages/NouvelleCategorie";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const DepensesStack = () => (
	<Stack.Navigator screenOptions={{ headerTitleAlign: "center" }}>
		<Stack.Screen
			name="Depenses"
			component={Depenses}
			options={{ title: "Dépenses" }}
		/>

		<Stack.Screen
			name="ModifierCategorie"
			component={ModifierCategorie}
			options={({ route }) => ({ title: "Modifier " + route.params.title })}
		/>

		<Stack.Screen
			name="DepensesCategorie"
			component={DepensesCategorie}
			options={({ route }) => ({ title: route.params.title })}
		/>

		<Stack.Screen
			name="ModifierDepense"
			component={ModifierDepense}
			options={({ route }) => ({ title: "Modifier " + route.params.title })}
		/>

		<Stack.Screen
			name="NouvelleCategorie"
			component={NouvelleCategorie}
			options={{ title: "Nouvelle catégorie" }}
		/>
	</Stack.Navigator>
);

export default DepensesStack;
