import { useState } from "react";
import { IonContent, IonPage, IonButton } from "@ionic/react";
import { auth } from "../firebase";

import "../css/yes-tab.css";
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

  return (
    <IonPage>
      <IonContent fullscreen>
        <p>{JSON.stringify(user)}</p>
      </IonContent>
    </IonPage>
  );
}

export default Dashboard;
