import AuthenticatedTab from "./AuthenticatedTab";
import GuestStack from "./GuestStack";
import DepenseTab from "./DepenseTab"
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const Routes = ({ user }) => {
	return (
		<NavigationContainer>
			<Stack.Navigator
				screenOptions={{
					headerShown: false,
				}}>
				{!user &&
					<Stack.Screen name="GuestStack" component={GuestStack} />
				}
				{user && <>
					<Stack.Screen name="UserTab" component={AuthenticatedTab} />
					<Stack.Screen name="DepenseTab" component={DepenseTab} />
				</>}

			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default Routes;
