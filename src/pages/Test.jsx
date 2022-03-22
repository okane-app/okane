import { IonButton, IonContent, IonPage } from "@ionic/react";

const Test = () => {
	return (
		<IonPage>
			<IonContent fullscreen>
				<h1>Test</h1>
				<IonButton routerLink="/dashboard">Dashboard</IonButton>
			</IonContent>
		</IonPage>
	);
};

export default Test;
