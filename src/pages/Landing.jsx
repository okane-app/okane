import { IonContent, IonPage, IonButton } from "@ionic/react";
import { useEffect } from "react";
import "../css/pages/Landing.css";
import {Redirect} from "react-router-dom";

function Landing() {
  // Hide tab bar
  // TODO move into export function for reusability
  useEffect(() => {
    let tabBar = document.querySelector("ion-tab-bar");
    tabBar.style.display = "none";
  }, []);

  return (
    <IonPage>
      <IonContent fullscreen>
        <h1 className="motto">Ne dépense plus jamais de trop.</h1>
        <IonButton expand="block" href="/login">Connexion</IonButton>
        <IonButton expand="block" href="/register">Inscription</IonButton>
        <p className="version">Version 1.0.0a</p>
      </IonContent>
    </IonPage>
  );
}

export default Landing;
