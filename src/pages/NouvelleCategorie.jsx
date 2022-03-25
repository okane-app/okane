import { Button, StyleSheet, Text, TextInput, ScrollView, View, Image } from "react-native";
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
    updateDoc,
} from "firebase/firestore";


const NouvelleCategorie = ({ navigation }) => {
    const user = auth.currentUser;

    const [nom, setNom] = useState("");
    const [limite, setLimite] = useState("");
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    // const [items, setItems] = useState([
    //     { value: '../../assets/icones/divertissement.png', icon: () => <Image source={require('../../assets/icones/divertissement.png')} style={styles.tinyLogo} /> },
    //     { value: '../../assets/icones/materiel-scolaire.png', icon: () => <Image source={require('../../assets/icones/materiel-scolaire.png')} style={styles.tinyLogo} /> },
    //     { value: '../../assets/icones/panier-de-courses.png', icon: () => <Image source={require('../../assets/icones/panier-de-courses.png')} style={styles.tinyLogo} /> },
    //     { value: '../../assets/icones/soins-de-sante.png', icon: () => <Image source={require('../../assets/icones/soins-de-sante.png')} style={styles.tinyLogo} /> },
    //     { value: '../../assets/icones/variante-de-ballon.png', icon: () => <Image source={require('../../assets/icones/variante-de-ballon.png')} style={styles.tinyLogo} /> },
    //     { value: '../../assets/icones/ordinateur-de-bureau.png', icon: () => <Image source={require('../../assets/icones/ordinateur-de-bureau.png')} style={styles.tinyLogo} /> },
    //     { value: '../../assets/icones/avion.png', icon: () => <Image source={require('../../assets/icones/avion.png')} style={styles.tinyLogo} /> },
       
    // ]);

    const usersCollectionRef = collection(db, "users", user.uid, "categories");



    const ajouter = async () => {
        await addDoc(usersCollectionRef, { nom: nom, limite: parseFloat(limite)})
        .then(async (docRef) => {
            await updateDoc(docRef,{id: docRef.id})
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
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

            {/* <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
            /> */}


            <Button
                title="Ajouter"
                onPress={() => {
                    ajouter(nom, limite);
                }}
            />
            <StatusBar style="auto" />

            <Text
                style={styles.link_color}
                onPress={() => navigation.navigate("allCategorie")}>
                Catégorie
            </Text>

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

    tinyLogo: {
        width: 30,
        height: 30,
    },

});