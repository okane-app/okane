import { IonContent, IonPage, IonButton } from "@ionic/react";

import "../css/no-tab.css";
import "../css/pages/Splash.css";

function Splash() {
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