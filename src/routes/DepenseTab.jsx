import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DepensesCategorie from '../pages/DepensesCategorie';
import NouvelleCategorie from "../pages/NouvelleCategorie"
import NouvelleDepense from "../pages/NouvelleDepense"
import AllCategorie from "../pages/AllCategorie"


const Stack = createNativeStackNavigator();

const DepenseTab = () => {
	return (
        <Stack.Navigator >
            <Stack.Screen name="NouvelleDepense" component={NouvelleDepense} />
            <Stack.Screen name="NouvelleCategorie" component={NouvelleCategorie} />
            <Stack.Screen name="AllCategorie" component={AllCategorie} />
            <Stack.Screen name="DepensesCategorie" component={DepensesCategorie} />
        </Stack.Navigator>
    );
}

export default DepenseTab;

