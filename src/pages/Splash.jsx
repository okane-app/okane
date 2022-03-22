import { IonButton, IonContent, IonPage } from "@ionic/react";

const Splash = () => {
	return (
		<IonPage>
			<IonContent fullscreen>
				<h1>Ne dépense plus jamais de trop.</h1>
				<IonButton routerLink="/connexion">Connexion</IonButton>
				<p>Version 1.0.0a</p>
			</IonContent>
		</IonPage>
	);
};

export default Splash;
