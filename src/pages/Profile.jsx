import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView, TouchableOpacity, Modal, Pressable, TextInput } from "react-native";
import React, { useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { updateProfile } from "firebase/auth";
import { auth } from "../../firebase";

const Profile = ({ navigation }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [pseudo, setPseudo] = React.useState(null);

    const changerPseudo = (pseudo) =>{
        updateProfile(auth.currentUser, {
            displayName: pseudo
          }).then(() => {
            alert("Changement réussi");
            setModalVisible(!modalVisible);
          }).catch((error) => {
            alert("échec du changement");
          });
    }

    const deconnexion = () => {
        auth.signOut().then(() => {
            navigation.replace("GuestStack")
        }).catch(error => alert(error.message))
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ alignSelf: "center", marginTop: 24, }}>
                    <View style={styles.profileImage}>
                        <Image source={require("../../assets/profile-pic.jpg")} style={styles.image}></Image>
                    </View>
                </View>

                <View style={styles.infoContainer}>
                    <Text style={[styles.text, { fontWeight: "200", fontSize: 36 }]}>{auth.currentUser?.displayName}</Text>
                </View>

                <View style={styles.accountMenuBox}>

                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            Alert.alert("Modal has been closed.");
                            setModalVisible(!modalVisible);
                        }}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={setPseudo}
                                    placeholder="Pseudo"
                                    value={pseudo}
                                />
                                <View style={styles.modalButton}>
                                    <Pressable
                                        style={[styles.button, styles.buttonClose]}
                                        onPress={() => changerPseudo(pseudo)}
                                    >
                                        <Text style={styles.textStyle}>Appliquer</Text>
                                    </Pressable>
                                    <Pressable
                                        style={[styles.button, styles.buttonClose]}
                                        onPress={() => setModalVisible(!modalVisible)}
                                    >
                                        <Text style={styles.textStyle}>Annuler</Text>
                                    </Pressable>
                                </View>
                            </View>
                        </View>
                    </Modal>

                    <TouchableOpacity onPress={() => setModalVisible(true)}>
                        <View style={styles.accountMenuItem}>
                            <View style={styles.accountMenuTextBox}>
                                <Ionicons name="pencil-outline" style={styles.accountMenuIcon} />
                                <Text style={styles.accountMenuText}>Changer de pseudo</Text>
                            </View>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <View style={styles.accountMenuItem}>
                            <View style={styles.accountMenuTextBox}>
                                <Ionicons name="settings-outline" style={styles.accountMenuIcon} />
                                <Text style={styles.accountMenuText}>Paramètres</Text>
                            </View>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={deconnexion}>
                        <View style={styles.accountMenuItem}>
                            <View style={styles.accountMenuTextBox}>
                                <Ionicons name="log-out-outline" style={styles.accountMenuIcon} />
                                <Text style={styles.accountMenuText}>Déconnexion</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>


            </ScrollView>
        </SafeAreaView>
    );
}

export default Profile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF"
    },
    text: {
        color: "#52575D"
    },
    image: {
        flex: 1,
        height: undefined,
        width: undefined
    },
    titleBar: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 24,
        marginHorizontal: 16
    },
    profileImage: {
        width: 200,
        height: 200,
        borderRadius: 100,
        overflow: "hidden"
    },
    infoContainer: {
        alignSelf: "center",
        alignItems: "center",
        marginTop: 16
    },
    accountMenuBox: {
        marginTop: 30,
    },
    accountMenuItem: {
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
    },
    accountMenuIcon: {
        width: 20,
        height: 20,
        marginLeft: 15,
        marginRight: 15,
    },
    accountMenuTextBox: {
        flex: 1,
        height: 60,
        flexDirection: 'row',
        borderBottomWidth: 0,
    },
    accountMenuText: {
        fontWeight: 'bold'
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        backgroundColor: "#EEEE",
        width: 200,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    modalButton: {
        alignItems: "center",
        flexDirection: "row",
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
});
