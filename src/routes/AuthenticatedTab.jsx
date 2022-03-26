import Accueil from "../pages/Accueil";
import Conseils from "../pages/Conseils";
import Depenses from "../pages/Depenses";
import Ionicons from "react-native-vector-icons/Ionicons";
import NouvelleDepense from "../pages/NouvelleDepense";
import Profil from "../pages/Profil";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

const AuthenticatedTab = () => {
	return (
		<Tab.Navigator
			screenOptions={{
				headerTitleAlign: "center",
				tabBarActiveTintColor: "#5DB075",
			}}>
			<Tab.Screen
				name="Accueil"
				component={Accueil}
				options={{
					tabBarIcon: ({ color, size }) => (
						<Ionicons name="home-outline" color={color} size={size} />
					),
				}}
			/>
			<Tab.Screen
				name="Dépenses"
				component={Depenses}
				options={{
					tabBarIcon: ({ color, size }) => (
						<Ionicons name="wallet-outline" color={color} size={size} />
					),
				}}
			/>
			<Tab.Screen
				name="Nouvelle dépense"
				component={NouvelleDepense}
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
					headerShown: false,
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
					headerShown: false,
					tabBarIcon: ({ color, size }) => (
						<Ionicons name="person-circle-outline" color={color} size={size} />
					),
				}}
			/>
		</Tab.Navigator>
	);
};

export default AuthenticatedTab;
