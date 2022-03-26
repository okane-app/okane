import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableHighlight,
    View,
    Image,
} from 'react-native';
import { auth, db } from "../../firebase";
import { SwipeListView } from 'react-native-swipe-list-view';
import { useCollectionData } from "react-firebase-hooks/firestore";
import { collection, limit, orderBy, query } from "firebase/firestore";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function allCategorie() {
    const user = auth.currentUser;

    const [categories, loading, error] = useCollectionData(
        query(
            collection(db, "users", user.uid, "categories"),
        )
    );

    const closeRow = (rowMap, rowKey) => {
        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow();
        }
    };


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Vos Catégories</Text>
            {categories && (
                <SwipeListView
                    useFlatList={true}
                    data={categories}
                    renderItem={(rowData, rowMap) => (
                        <TouchableHighlight
                        // onPress={() => console.log('You touched me')}
                        style={styles.rowFront}
                        underlayColor={'#FFF'}
                    >
                        <View>
                            <Text> {rowData.item.nom}</Text>
                        </View>
                    </TouchableHighlight>
                    )}
                    renderHiddenItem={(rowData, rowMap) => (
                        <View style={styles.rowBack}>
                            <TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnLeft]} onPress={() => rowMap[rowData.item.id].closeRow()}>
                                <Text style={styles.backTextWhite}>Close</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.backRightBtn, styles.backRightBtnRight]}
                                onPress={() => deleteRow(rowMap, data.item.id)}
                            >
                                <Ionicons name="trash-outline" color={"#FFF"} size={28} />
                            </TouchableOpacity>
                        </View>
                    )}
                    keyExtractor={item => item.id}
                    rightOpenValue={-150}
                    onRowOpen={(rowKey, rowMap) => {
                        setTimeout(() => {
                            rowMap[rowKey].closeRow()
                        }, 2000)
                    }}
                />
            )}
        </View>
    );
}
//{ rowData: any, rowMap: { string: SwipeRowRef } } : ReactElement

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
    },
    backTextWhite: {
        color: '#FFF',
    },
    rowFront: {
        alignItems: 'center',
        backgroundColor: '#CCC',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        justifyContent: 'center',
        height: 50,
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: '#DDD',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75,
    },
    backRightBtnLeft: {
        backgroundColor: 'blue',
        right: 75,
    },
    backRightBtnRight: {
        backgroundColor: 'red',
        right: 0,
    },
});
