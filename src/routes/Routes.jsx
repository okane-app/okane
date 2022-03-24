import AuthenticatedTab from "./AuthenticatedTab";
import GuestStack from "./GuestStack";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const Routes = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator
				screenOptions={{
					headerShown: false,
				}}>
				<Stack.Screen name="GuestStack" component={GuestStack} />
				<Stack.Screen name="AuthenticatedTab" component={AuthenticatedTab} />
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default Routes;
