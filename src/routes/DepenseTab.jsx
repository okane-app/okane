import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NouvelleDepense from "../pages/NouvelleDepense"
import NouvelleCategorie from "../pages/NouvelleCategorie"

const Stack = createNativeStackNavigator();

const DepenseTab = () => {
    return (
        <Stack.Navigator  initialRouteName="NouvelleDepense"
        screenOptions={({ route, navigation }) => ({
          headerShown: false,
          gestureEnabled: true,})}>
            <Stack.Screen name="NouvelleDepense" component={NouvelleDepense} />
            <Stack.Screen name="NouvelleCategorie" component={NouvelleCategorie} />
        </Stack.Navigator>
    );
}

export default DepenseTab;