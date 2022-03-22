import "./css/Dashboard.css";

import { IonContent, IonPage, IonIcon } from "@ionic/react";

import { collection } from "firebase/firestore";
import { db } from "../firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useState } from "react";
import { square } from "ionicons/icons";

const Dashboard = (props) => {
	const [user] = useState(props.user);
	

	const [depenses, loading, error] = useCollectionData(
		collection(db, "users", "DyUabIIgp0fvrPEBdA5gEGYExkI2", "categories")
	);


	return (
		<IonPage>
			<IonContent fullscreen>
				<div className="container">
					{error && <p>Erreur : {JSON.stringify(error)}</p>}
					{loading && <p>Chargement de vos dernières dépenses...</p>}
					{depenses && (
						<ul>
							{depenses.map((depense, index) => {
								return <IonIcon key={depenses.id} icon={square} style={{color: depense.couleur}}/>;
							})}
						</ul>
					)}
				</div>
			</IonContent>
		</IonPage>
	);
};

export default Dashboard;
