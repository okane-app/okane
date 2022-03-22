import "./css/Connexion.css";

import { IonContent, IonPage, IonButton } from "@ionic/react";
import {db} from "../firebase"
import { useState } from "react";
  
const Firestore = () => {
    const [nom  , SetNom] = useState("");
    const [limite , SetLimite] = useState("");
    const sub = (e) => {
    
          
        // Add data to the store
        db.collection("users").add({
            Nom: nom,
            Limite: limite,
        })
        .then((docRef) => {
            alert("Data Successfully Submitted");
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
    }
  
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
						type="text"
						name="limite"
						id="limite"
						value={limite}
						onChange={(e) => SetLimite(e.target.value)}
					/>

					<IonButton onClick={() => sub()}>
						Connexion
					</IonButton>
				</div>
			</IonContent>
		</IonPage>
      
    );
}
  
export default Firestore;