import { Button, StyleSheet, Text, TextInput, ScrollView, View } from "react-native";
//import {Picker} from '@react-native-picker/picker';
import { db, auth } from "../../firebase"
import { StatusBar } from "expo-status-bar";
import { CommonActions } from "@react-navigation/native";
import { useState } from "react";
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/FontAwesome';

import {
    collection,
    addDoc,
} from "firebase/firestore";


const NouvelleCategorie = ({ navigation }) => {
    const user = auth.currentUser;

    const [Nom, setNom] = useState("");
    const [Limite, setLimite] = useState("");
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { value: 'gamepad',icon: () => <Icon name="gamepad" size={30} color="#900" /> },
        { value: 'book',icon: () => <Icon name="book" size={30} color="#900" /> },
        { value: 'shopping-cart',icon: () => <Icon name="shopping-cart" size={30} color="#900" /> },
        { value: 'medkit',icon: () => <Icon name="medkit" size={30} color="#900" /> },
        { value: 'soccer-ball-o',icon: () => <Icon name="soccer-ball-o" size={30} color="#900" /> },
        { value: 'laptop',icon: () => <Icon name="laptop" size={30} color="#900" /> },
        { value: 'plane',icon: () => <Icon name="plane" size={30} color="#900" /> },
    ]);

    const usersCollectionRef = collection(db, "users", user.uid, "categories");



    const ajouter = async () => {
        await addDoc(usersCollectionRef, { Nom: Nom, Limite: parseFloat(Limite), Icon: icon });
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

            <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
            />


            <Button
                title="Ajouter"
                onPress={() => {
                    ajouter(Nom, Limite);
                }}
            />
            <StatusBar style="auto" />
        </View >

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