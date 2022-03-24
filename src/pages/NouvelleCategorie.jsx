import { Button, StyleSheet, Text, TextInput, ScrollView, View } from "react-native";
//import {Picker} from '@react-native-picker/picker';
import { db } from "../../firebase"
import { StatusBar } from "expo-status-bar";
import { CommonActions } from "@react-navigation/native";
import { useState } from "react";
import RNPickerSelect from 'react-native-picker-select';

import {
    collection,
    addDoc,
} from "firebase/firestore";


const NouvelleCategorie = ({ navigation }) => {
    const [Nom, setNom] = useState("");
    const [Limite, setLimite] = useState("");
    const [icon, setIcon] = useState("");

    const usersCollectionRef = collection(db, "users", "DyUabIIgp0fvrPEBdA5gEGYExkI2", "categories");



    const ajouter = async () => {
        await addDoc(usersCollectionRef, { Nom: Nom, Limite: parseFloat(Limite),Icon: icon});
    };
   

    return (

        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Nom"
                onChangeText={setNom}
            />
            <TextInput
                style={styles.input}
                placeholder="Limite"
                onChangeText={(setLimite)}
            />

            <RNPickerSelect
                onValueChange={setIcon}
                items={[
                    {label: 'Divertissement', value: 'add-circle-outline'}
                ]}
            >
            </RNPickerSelect>

            <Button
                title="Ajouter"
                onPress={() => {
                    ajouter(Nom, Limite);
                }}
            />
            <StatusBar style="auto" />
        </View>

    );
};

export default NouvelleCategorie;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
        alignItems: "center",
        justifyContent: "center",
    },

    input: {
        height: 40,
        width: 140,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },

});