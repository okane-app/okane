import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { auth, login } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import { hideTabs } from "../utils";

import "../css/pages/Connexion.css";
import { IonPage } from "@ionic/react";

function Connexion() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [user] = useAuthState(auth);

	useEffect(() => {
		if (user) {
			console.log("connecté");
		}
	}, [user]);

	hideTabs();

	return (
		<IonPage>
			<div className="login">
				<div className="login__container">
					<input
						type="text"
						className="login__textBox"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="E-mail Address"
					/>
					<input
						type="password"
						className="login__textBox"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder="Password"
					/>
					<button
						className="login__btn"
						onClick={async () => {
							await login(email, password);
							window.location.href = "./dashboard"; // TODO change
						}}>
						Login
					</button>
					<div>
						<Link to="/reset">Forgot Password</Link>
					</div>
					<div>
						Don't have an account? <Link to="/inscription">Register</Link> now.
					</div>
				</div>
			</div>
		</IonPage>
	);
}
export default Connexion;
