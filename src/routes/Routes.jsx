import Connexion from "../pages/Connexion";
import Dashboard from "../pages/Dashboard";
import Profile from "../pages/Profile";
import Ionicons from "react-native-vector-icons/Ionicons";
import { NavigationContainer } from "@react-navigation/native";
import Splash from "../pages/Splash";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const GuestStack = () => {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
			}}>
			<Stack.Screen name="Splash" component={Splash} />
			<Stack.Screen name="Connexion" component={Connexion} />
		</Stack.Navigator>
	);
};

const UserTab = () => {
	return (
		<Tab.Navigator 
		screenOptions={{
			headerTitleAlign: "center",
		}}
		>
			<Tab.Screen
				name="Accueil"
				component={Dashboard}
				options={{
					tabBarIcon: (
						{ color, size } // TODO focused
					) => <Ionicons name="home" color={color} size={size} />,
				}}
			/>
			<Tab.Screen
				name="Profile"
				component={Profile}
				options={{
					tabBarIcon: (
						{ color, size } // TODO focused
					) => <Ionicons name="person-circle-outline" color={color} size={size} />,
				}}
			/>
		</Tab.Navigator>
	);
};

const Routes = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator
				screenOptions={{
					headerShown: false,
				}}>
				<Stack.Screen name="GuestStack" component={GuestStack} />
				<Stack.Screen name="UserTab" component={UserTab} />
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default Routes;
