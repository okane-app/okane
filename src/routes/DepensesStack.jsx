import Depenses from "../pages/Depenses";
import DepensesCategorie from "../pages/DepensesCategorie";
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
			name="DepensesCategorie"
			component={DepensesCategorie}
			options={({ route }) => ({ title: route.params.title })}
		/>
	</Stack.Navigator>
);

export default DepensesStack;
