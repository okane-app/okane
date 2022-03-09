import { IonContent, IonPage, IonButton } from "@ionic/react";

import "../css/no-tab.css";
import "../css/pages/Accueil.css";

function Accueil() {
  return (
    <IonPage>
      <IonContent fullscreen>
        <h1 className="motto">Ne dépense plus jamais de trop.</h1>
        <IonButton color="primary" expand="block" href="/connexion">
          Connexion
        </IonButton>
        <IonButton color="secondary"  expand="block" href="/inscription">
          Inscription
        </IonButton>
        <p className="version">Version 1.0.0a</p>
      </IonContent>
    </IonPage>
  );
}

export default Accueil;
