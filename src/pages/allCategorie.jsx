import { StyleSheet, Text, View, TouchableOpacity, Button, Animated, Image, TouchableHighlight } from "react-native";
import { auth, db } from "../../firebase";
import { collection, deleteDoc, query, doc } from "firebase/firestore";
import Icon from 'react-native-vector-icons/FontAwesome';
import { StatusBar } from "expo-status-bar";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { SwipeListView } from 'react-native-swipe-list-view';

const allCategorie = ({ navigation }) => {
	const user = auth.currentUser;
	const usersCollectionRef = collection(db, "users", user.uid, "categories");

	const [categories, setCategorie, loading, error] = useCollectionData(
		query(
			collection(db, "users", user.uid, "categories"),
		)
	);

	const supprimer = async () => {
		await deleteDoc(doc(db, { categories }))
	}

	// const rowSwipeAnimatedValues = {};

	// const renderCategorie = ({ item }) => (

	// 	<View

	// 		style={{
	// 			flexDirection: "row",
	// 			justifyContent: "space-between",
	// 			width: 300,
	// 		}}>
	// 		<TouchableHighlight onPress={() => { supprimer(); }}>
	// 			<Icon name="close" size={16} />
	// 		</TouchableHighlight>
	// 		<Text style={styles.depense}>{item.nom}</Text>

	// 	</View>

	// );
	const closeRow = (rowMap, rowKey) => {
		if (rowMap[rowKey]) {
			rowMap[rowKey].closeRow();
		}
	};

	const onRowDidOpen = rowKey => {
		console.log('This row opened', rowKey);
	};

	const onSwipeValueChange = swipeData => {
		const { key, value } = swipeData;
		rowSwipeAnimatedValues[key].setValue(Math.abs(value));
	};


	// const deleteRow = (rowMap, rowKey) => {
	//     closeRow(rowMap, rowKey);
	//     const newData = [...categories];
	//     const prevIndex = listData.findIndex(item => item.key === rowKey);
	//     newData.splice(prevIndex, 1);
	//     setCategorie(newData);
	// };

	const renderItem = (data) => {(
		
		<TouchableHighlight
			onPress={() => console.log('You touched me')}
			style={styles.rowFront}
			underlayColor={'#FFF'}
		>
			<View>
				<Text> {data.item.label}</Text>
				
			</View>
		</TouchableHighlight>
		
	)};

	const renderHiddenItem = (data, rowMap) => (
		<View style={styles.rowBack}>
			<Text>Left</Text>
			<TouchableOpacity
				style={[styles.backRightBtn, styles.backRightBtnLeft]}
				onPress={() => closeRow(rowMap, data.item.key)}
			>
				<Text style={styles.backTextWhite}>Close</Text>
			</TouchableOpacity>
			<TouchableOpacity
				style={[styles.backRightBtn, styles.backRightBtnRight]}
				onPress={() => alert("Supp appuyé")}
			//onPress={() => deleteRow(rowMap, data.item.key)}
			>
				<Animated.View
					style={
						styles.trash
						// {
						// 	transform: [
						// 		{
						// 			scale: rowSwipeAnimatedValues[
						// 				data.item.key
						// 			].interpolate({
						// 				inputRange: [45, 90],
						// 				outputRange: [0, 1],
						// 				extrapolate: 'clamp',
						// 			}),
						// 		},
						// 	],
						// },
					}
				>
					<Image
						source={require('../../assets/icones/poubelle.png')}
						style={styles.trash}
					/>
				</Animated.View>
			</TouchableOpacity>
		</View>
	);

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Vos Catégories</Text>
			{categories && (
				<View style={styles.container}>
					<SwipeListView
						data={categories?.map((categorie) => ({ key: categorie.id, label: categorie.nom }))}
						renderItem={renderItem}
						renderHiddenItem={renderHiddenItem}
						leftOpenValue={75}
						rightOpenValue={-150}
						previewRowKey={'0'}
						previewOpenValue={-40}
						previewOpenDelay={3000}
						onRowDidOpen={onRowDidOpen}
						onSwipeValueChange={onSwipeValueChange}
					/>
				</View>

			)}

			{loading && <Text>Chargement de vos dernières catégorie</Text>}
			{error && <Text>Erreur : {JSON.stringify(error)}</Text>}
			<StatusBar style="auto" />


		</View>
	);
};

export default allCategorie;

const styles = StyleSheet.create({
	container: {
		padding: 30,
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},

	title: {
		fontSize: 24,
		fontWeight: "bold",
		alignSelf: "flex-start",
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
	trash: {
		height: 25,
		width: 25,
	},
});