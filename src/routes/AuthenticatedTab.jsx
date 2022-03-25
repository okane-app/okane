import Accueil from "../pages/Accueil";
import Ionicons from "react-native-vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import NouvelleDepense from "../pages/NouvelleDepense"
import DepenseTab from "./DepenseTab";

const Tab = createBottomTabNavigator();

const AuthenticatedTab = () => {
	return (
		<Tab.Navigator>
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
				component={DepenseTab}
				options={{
					headerShown: false,
					tabBarIcon: ({ color, size }) => (
						<Ionicons name="add-circle-outline" color={color} size={size} />
					),
				}}
			/>
			<Tab.Screen
				name="Conseils"
				component={Accueil}
				options={{
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
				component={Accueil}
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
