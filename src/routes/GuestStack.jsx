import Connexion from "../pages/Connexion";
import Splash from "../pages/Splash";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const GuestStack = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen name="Splash" component={Splash} />
			<Stack.Screen name="Connexion" component={Connexion} />
		</Stack.Navigator>
	);
};

export default GuestStack;
