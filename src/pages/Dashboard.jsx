import { useState } from "react";
import { IonContent, IonPage, IonButton } from "@ionic/react";
import { auth } from "../firebase";

import { showTabs } from "../utils";

import "../css/pages/Dashboard.css";

function Dashboard() {
  const [user, setUser] = useState(null);

  auth.onAuthStateChanged((user) => {
    if (user) {
      setUser(user);
    } else {
      window.location.href = "./splash";
    }
  });

  showTabs();

  return (
    <IonPage>
      <IonContent fullscreen>
        <p>{JSON.stringify(user)}</p>
      </IonContent>
    </IonPage>
  );
}

export default Dashboard;
