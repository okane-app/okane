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

import {
	IonApp,
	IonIcon,
	IonLabel,
	IonRouterOutlet,
	IonTabBar,
	IonTabButton,
	IonTabs,
	setupIonicReact,
} from "@ionic/react";
import { Redirect, Route } from "react-router-dom";

import NouvelleCategorie from "./pages/NouvelleCategorie"
import Connexion from "./pages/Connexion";
import Dashboard from "./pages/Dashboard";
import { IonReactRouter } from "@ionic/react-router";
import Splash from "./pages/Splash";
import { auth } from "./firebase";
import { square } from "ionicons/icons";
import { useAuthState } from "react-firebase-hooks/auth";

setupIonicReact();

const App = () => {
	const [currentUser] = useAuthState(auth);

	return (
		<IonApp>
			<IonReactRouter>
				<IonTabs>
					<IonRouterOutlet>
						<Route exact path="/splash">
							<Splash />
						</Route>
						<Route exact path="/connexion">
							<Connexion />
						</Route>
						<Route exact path="/nouvellecategorie">
							<NouvelleCategorie  />
						</Route>
						<Route exact path="/dashboard">
							<Dashboard user={currentUser} />
						</Route>
						<Route exact path="/">
							<Redirect to="/splash" />
						</Route>
					</IonRouterOutlet>
					<IonTabBar slot="bottom">
						<IonTabButton tab="nouvellecategorie" href="/nouvellecategorie">
							<IonIcon icon={square} />
							<IonLabel>Nouvelle Categorie</IonLabel>
					
						</IonTabButton>
						<IonTabButton tab="dashboard" href="/dashboard">
							<IonIcon icon={square} />
							<IonLabel>Accueil</IonLabel>
						</IonTabButton>
					</IonTabBar>
				</IonTabs>
			</IonReactRouter>
		</IonApp>
	);
};

export default App;
