import "../css/pages/Connexion.css";

import { Link, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";

import { IonPage } from "@ionic/react";
import { auth } from "../firebase";
import { hideTabs } from "../utils";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

function Connexion() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [user] = useAuthState(auth);
	const history = useHistory();

	useEffect(() => {
		if (user) {
			history.push("/dashboard");
		}
	}, [user, history]);

	const login = (email, password) => {
		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				localStorage.setItem("user", JSON.stringify(userCredential.user));
				history.push("/dashboard");
			})
			.catch((error) => {
				console.error(error.message);
			});
	};

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
						onClick={() => {
							login(email, password);
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
