import "./css/Connexion.css";

import { IonContent, IonPage, IonButton, IonIcon } from "@ionic/react";
import { db } from "../firebase"
import { useState } from "react";
import {
	collection,
	addDoc,
} from "firebase/firestore";
import { square } from "ionicons/icons";
import randomColor from "randomcolor";


const divStyle = {
	color: randomColor(),
};

console.log(randomColor());

const NouvelleCategorie = (props) => {


	const [user] = useState(props.user);
	const [nom, SetNom] = useState("");
	const [limite, SetLimite] = useState(0);
	const usersCollectionRef = collection(db, "users", "DyUabIIgp0fvrPEBdA5gEGYExkI2", "categories");


	const createUser = async () => {
		await addDoc(usersCollectionRef, { nom: nom, limite: parseFloat(limite) });
	};


	return (
		<IonPage>
			<IonContent fullscreen>
				<div className="container">
					<label htmlFor="nom">Nom</label>
					<input
						type="text"
						name="nom"
						id="nom"
						value={nom}
						onChange={(e) => SetNom(e.target.value)}
					/>

					<label htmlFor="limite">Plafond</label>
					<input
						type="number"
						name="limite"
						id="limite"
						value={limite}
						onChange={(e) => SetLimite((e.target.value))}
					/>

				<IonIcon icon={square} style={divStyle} classname="squareIcon"/>
					<IonButton onClick={createUser}>
						Ajouter
					</IonButton>
				</div>
			</IonContent>
		</IonPage >

	);
}

export default NouvelleCategorie;