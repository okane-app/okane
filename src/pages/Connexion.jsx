import "./css/Connexion.css";

import { IonContent, IonPage } from "@ionic/react";

import { IonButton } from "@ionic/react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useHistory } from "react-router-dom";
import { useState } from "react";

const Connexion = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const history = useHistory();

	const login = async (email, password) => {
		await signInWithEmailAndPassword(auth, email, password);
		history.push("/dashboard");
	};

	return (
		<IonPage>
			<IonContent fullscreen>
				<div className="container">
					<label htmlFor="email">Adresse mail</label>
					<input
						type="text"
						name="email"
						id="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>

					<label htmlFor="password">Mot de passe</label>
					<input
						type="password"
						name="password"
						id="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>

					<IonButton onClick={() => login(email, password)}>
						Connexion
					</IonButton>
				</div>
			</IonContent>
		</IonPage>
	);
};

export default Connexion;
