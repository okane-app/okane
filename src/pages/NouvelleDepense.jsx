import { Button, StyleSheet, Text, View } from "react-native";

import { StatusBar } from "expo-status-bar";


const NouvelleDepense = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text>Nouvelle, Depense!</Text>
            <Text style={styles.link_color} onPress={() => navigation.navigate("NouvelleCategorie")}>
                Nouvelle Catégorie
            </Text>
            <StatusBar style="auto" />
        </View>
    );
};

export default NouvelleDepense;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },

    link_color: {
        color: "#5DB075",
    }
});

