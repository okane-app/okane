import Accueil from "../pages/Accueil";
import Conseils from "../pages/Conseils";
import Ionicons from "react-native-vector-icons/Ionicons";
import Profil from "../pages/Profil";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

const AuthenticatedTab = () => {
	return (
		<Tab.Navigator
			screenOptions={{
				headerTitleAlign: "center",
			}}>
			<Tab.Screen
				name="Accueil"
				component={Accueil}
				options={{
					tabBarIcon: ({ color, size }) => (
						<Ionicons name="home" color={color} size={size} />
					),
				}}
			/>
			<Tab.Screen
				name="Dépenses"
				component={Accueil}
				options={{
					tabBarIcon: ({ color, size }) => (
						<Ionicons name="cash-outline" color={color} size={size} />
					),
				}}
			/>
			<Tab.Screen
				name="Nouvelle dépense"
				component={Accueil}
				options={{
					tabBarIcon: ({ color, size }) => (
						<Ionicons name="add-circle-outline" color={color} size={size} />
					),
				}}
			/>
			<Tab.Screen
				name="Conseils"
				component={Conseils}
				options={{
					headerShown: false, // TODO keep or not
					tabBarIcon: ({ color, size }) => (
						<Ionicons
							name="chatbubble-ellipses-outline"
							color={color}
							size={size}
						/>
					),
				}}
			/>
			<Tab.Screen
				name="Profil"
				component={Profil}
				options={{
					tabBarIcon: ({ color, size }) => (
						<Ionicons name="person-circle-outline" color={color} size={size} />
					),
				}}
			/>
		</Tab.Navigator>
	);
};

export default AuthenticatedTab;
