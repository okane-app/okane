import { Button, StyleSheet, Text, View, TextInput, FlatList } from "react-native";
import { useState } from "react";
import { RadioButton } from 'react-native-paper';
import { db, auth } from "../../firebase"
import { StatusBar } from "expo-status-bar";
import RNPickerSelect from 'react-native-picker-select';
import { useCollection, useCollectionData, useCollectionOnce } from "react-firebase-hooks/firestore";
import { collection, limit, orderBy, query, addDoc, onSnapshot } from "firebase/firestore";


const NouvelleDepense = ({ navigation }) => {
    const user = auth.currentUser;
    

    const [checked, setChecked] = useState('first');
    const [categorie, setCategorie] = useState("1");
    const [nom, setNom] = useState("");
    const [montant, setMontant] = useState("");
    const [frequence, setFrequence] = useState("");

    const usersCollectionRef = collection(db, "users", user.uid, "depenses");

    let date = new Date();


    const ajouter = async () => {
        await addDoc(usersCollectionRef, { nom: nom, montant: parseFloat(montant), categorie: categorie, date: date });
    };

    
    // const [categories, loading, error] = useCollection(
    //     query(
    //         collection(db, "users", user.uid, "categories"),

    //     )
    // );

    const d = db.collection("users").get()
    console.log(d)

    return (
        <View style={styles.container}>

            <Text>Nouvelle, Depense!</Text>

            <View style={styles.ligne} >
                <Text>Dépenses ponctuelle</Text>
                <RadioButton
                    label="Dépenses ponctuelle"
                    value="first"
                    status={checked === 'first' ? 'checked' : 'unchecked'}
                    onPress={() => setChecked('first')}
                />
            </View>

            <View style={styles.ligne} >
                <Text>Dépenses ponctuelle</Text>
                <RadioButton
                    value="second"
                    status={checked === 'second' ? 'checked' : 'unchecked'}
                    onPress={() => setChecked('second')}
                />
            </View>

            <View>
                <Text>Dépenses ponctuelle</Text>
                <RadioButton
                    value="troisième"
                    status={checked === 'troisième' ? 'checked' : 'unchecked'}
                    onPress={() => setChecked('troisième')} />
            </View>

           
                {/* <RNPickerSelect
                    onValueChange={setCategorie}
                    items={[    
                                            
                        { label:categories.nom, value: KEYID }
                    ]}
                >
                 </RNPickerSelect> */}
         
             
            {/* {loading && <Text>Chargement des catégories</Text>}
            {error && <Text>Erreur : {JSON.stringify(error)}</Text>} */}


            <Text style={styles.link_color} onPress={() => navigation.navigate("NouvelleCategorie")}>
                Nouvelle Catégorie
            </Text>

            <TextInput
                title="Nom de la dépense"
                style={styles.input}
                placeholder="Divertissement"
                onChangeText={setNom}
            />

            <TextInput
                title="Montant"
                style={styles.input}
                placeholder="14,50 €"
                onChangeText={setMontant}
            />

            <Button
                title="Ajouter"
                onPress={() => {
                    ajouter(nom, montant, categorie);
                }}
            />
            {/* Voir pour changer la zone fréquence en une somme qui sera débité tout les mois */}
            {/* {checked == "second" ? <TextInput title="Fréquence" style={styles.input} placeholder="Mensuelle" onChangeText={setMontant}/> : 
            <TextInput title="Montant" style={styles.input} placeholder="14,50 €" onChangeText={setMontant} />} */}
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
    },

    input: {
        height: 40,
        width: 140,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    }
});

