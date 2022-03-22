import "./css/Dashboard.css";

import { IonContent, IonPage } from "@ionic/react";

import { collection } from "firebase/firestore";
import { db } from "../firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useState } from "react";

const Dashboard = (props) => {
	const [user] = useState(props.user);

	const [depenses, loading, error] = useCollectionData(
		collection(db, "users", user.uid, "depenses")
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
								return <li key={index}>{JSON.stringify(depense)}</li>;
							})}
						</ul>
					)}
				</div>
			</IonContent>
		</IonPage>
	);
};

export default Dashboard;
