import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NouvelleDepense from "../pages/NouvelleDepense"
import NouvelleCategorie from "../pages/NouvelleCategorie"
import allCategorie from "../pages/allCategorie"

const Stack = createNativeStackNavigator();

const DepenseTab = () => {
    return (

        <Stack.Navigator >
            <Stack.Screen name="NouvelleDepense" component={NouvelleDepense} />
            <Stack.Screen name="NouvelleCategorie" component={NouvelleCategorie} />
            <Stack.Screen name="allCategorie" component={allCategorie} />
        </Stack.Navigator>
    );
}

export default DepenseTab;