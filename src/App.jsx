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
import { square, triangle } from "ionicons/icons";
import { useEffect, useState } from "react";

import Connexion from "./pages/Connexion";
import Dashboard from "./pages/Dashboard";
import { IonReactRouter } from "@ionic/react-router";
import Splash from "./pages/Splash";
import Test from "./pages/Test";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

setupIonicReact();

const App = () => {
	const [currentUser, setCurrentUser] = useState(null);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setCurrentUser(user);
		});
		return () => unsubscribe();
	}, []);

	return (
		<IonApp>
			<IonReactRouter>
				<IonTabs>
					<IonRouterOutlet>
						<Route path="/splash">
							<Splash />
						</Route>
						<Route path="/connexion">
							<Connexion />
						</Route>
						<Route path="/dashboard">
							<Dashboard user={currentUser} />
						</Route>
						<Route path="/test">
							<Test />
						</Route>
						<Route exact path="/">
							<Redirect to="/splash" />
						</Route>
					</IonRouterOutlet>
					<IonTabBar slot="bottom">
						<IonTabButton tab="dashboard" href="/dashboard">
							<IonIcon icon={square} />
							<IonLabel>Accueil</IonLabel>
						</IonTabButton>

						<IonTabButton tab="test" href="/test">
							<IonIcon icon={triangle} />
							<IonLabel>Test</IonLabel>
						</IonTabButton>
					</IonTabBar>
				</IonTabs>
			</IonReactRouter>
		</IonApp>
	);
};

export default App;
