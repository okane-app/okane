import { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { auth, login } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import "../css/no-tab.css";
import "../css/pages/Connexion.css";

function Accueil() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) <Redirect to="/accueil" />;
  }, [user, loading]);

  return (
    <div className="login">
      <div className ="titre">
        <h1>Connexion</h1>
      </div>
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
        <div>
          <Link className="lien" to="/reset">Forgot Password ?</Link>
        </div>
      
        <button className="login__btn" onClick={() => login(email, password)}>
          Login
        </button>
        
        <div>
          Don't have an account? <Link className="lien" to="/inscription">Register</Link> now.
        </div>
      </div>
    </div>
  );
}
export default Accueil;
