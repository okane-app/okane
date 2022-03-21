import "../css/pages/Splash.css";

import { IonButton, IonContent, IonPage } from "@ionic/react";

import { hideTabs } from "../utils";

function Splash() {
	hideTabs();

	return (
		<IonPage>
			<IonContent fullscreen>
				<h1 className="motto">Ne dépense plus jamais de trop.</h1>
				<IonButton expand="block" routerLink="/connexion">
					Connexion
				</IonButton>
				<IonButton expand="block" routerLink="/inscription">
					Inscription
				</IonButton>
				<p className="version">Version 1.0.0a</p>
			</IonContent>
		</IonPage>
	);
}

export default Splash;
