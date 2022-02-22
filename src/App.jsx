import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonIcon,
  IonInput,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { ellipse, square, triangle } from "ionicons/icons";

import Splash from "./pages/Splash";
import Connexion from "./pages/Connexion";
import Inscription from "./pages/Inscription";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import "./css/global.css";

setupIonicReact();

function App() {
  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route path="/splash" component={Splash} exact />
            <Route exact path="/" render={() => <Redirect to="/splash" />} />
            <Route path="/connexion" component={Connexion} exact />
            <Route path="/inscription" component={Inscription} exact />
          </IonRouterOutlet>
          
          <IonTabBar slot="bottom">
            <IonTabButton tab="tab1" href="/accueil">
              <IonIcon icon={triangle} />
              <IonLabel>Splash</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
}

export default App;
