import "@ionic/react/css/core.css";
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";
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

import Connexion from "./pages/Connexion";
import Dashboard from "./pages/Dashboard";
import Inscription from "./pages/Inscription";
import { IonReactRouter } from "@ionic/react-router";
import Splash from "./pages/Splash";
import { square } from "ionicons/icons";

setupIonicReact();

function App() {
	return (
		<IonApp>
			<IonReactRouter>
				<IonTabs>
					<IonRouterOutlet>
						<Route exact path="/" render={() => <Redirect to="/splash" />} />
						<Route path="/splash" component={Splash} exact />
						<Route path="/inscription" component={Inscription} exact />
						<Route path="/connexion" component={Connexion} exact />
						<Route path="/dashboard" component={Dashboard} exact />
					</IonRouterOutlet>

					<IonTabBar slot="bottom">
						<IonTabButton tab="dashboard" href="/dashboard">
							<IonIcon icon={square} />
							<IonLabel>Accueil</IonLabel>
						</IonTabButton>
					</IonTabBar>
				</IonTabs>
			</IonReactRouter>
		</IonApp>
	);
}

export default App;
