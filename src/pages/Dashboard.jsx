import "../css/pages/Dashboard.css";

import { IonButton, IonContent, IonPage } from "@ionic/react";
import { auth, logout } from "../firebase";
import { useEffect, useState } from "react/";

import Depenses from "./components/Depenses";
import { onAuthStateChanged } from "firebase/auth";
import { showTabs } from "../utils";

function Dashboard() {
	// onAuthStateChanged(auth, (user) => {
	// 	if (!user) window.location.href = "/splash";
	// });

	const user = JSON.parse(localStorage.getItem("user"));

	showTabs();

	return (
		<IonPage>
			<IonContent fullscreen>
				<Depenses user={user} />

				{/* TODO move */}
				<IonButton onClick={() => logout()}>Déconnexion</IonButton>
			</IonContent>
		</IonPage>
	);
}

export default Dashboard;
