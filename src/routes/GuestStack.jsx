import Connexion from "../pages/Connexion";
import Inscription from "../pages/Inscription";
import Splash from "../pages/Splash";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const GuestStack = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen name="Splash" component={Splash} />
			<Stack.Screen name="Connexion" component={Connexion} />
			<Stack.Screen name="Inscription" component={Inscription} />
		</Stack.Navigator>
	);
};

export default GuestStack;
