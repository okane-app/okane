import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NouvelleDepense from "../pages/NouvelleDepense"
import NouvelleCategorie from "../pages/NouvelleCategorie"

const SettingsStack = createNativeStackNavigator();

const DepenseTab = () => {
    return (
        <SettingsStack.Navigator>
            <SettingsStack.Screen name="NouvelleDepense" component={NouvelleDepense} />
            <SettingsStack.Screen name="NouvelleCategorie" component={NouvelleCategorie} />
        </SettingsStack.Navigator>
    );
}

export default DepenseTab;