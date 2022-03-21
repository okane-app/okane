import "../css/pages/Inscription.css";

import { Link, useHistory } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

import { IonPage } from "@ionic/react";
import { auth } from "../firebase";
import { db } from "../firebase";
import { hideTabs } from "../utils";
import { useAuthState } from "react-firebase-hooks/auth";

function Inscription() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [username, setUsername] = useState("");
	const [user, loading] = useAuthState(auth);
	const history = useHistory();

	useEffect(() => {
		if (loading) return;
	}, [user, loading]);

	hideTabs();

	const register = async (username, email, password) => {
		try {
			const res = await createUserWithEmailAndPassword(auth, email, password);
			const user = res.user;

			await updateProfile(user, { displayName: username });

			await setDoc(doc(db, "users", user.uid), {
				// username: username,
				authProvider: "local",
				// email, // email: email
			}).then(() => {
				history.push("/dashboard");
			});
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<IonPage>
			<div className="register">
				<div className="register__container">
					<input
						type="text"
						className="register__textBox"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						placeholder="Username"
					/>

					<input
						type="text"
						className="register__textBox"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="E-mail Address"
					/>

					<input
						type="password"
						className="register__textBox"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder="Password"
					/>

					<button
						className="register__btn"
						onClick={() => {
							register(username, email, password);
						}}>
						Register
					</button>

					<div>
						Already have an account? <Link to="/connexion">Login</Link> now.
					</div>
				</div>
			</div>
		</IonPage>
	);
}
export default Inscription;
