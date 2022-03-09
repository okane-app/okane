import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import { auth, register } from "../firebase";

import "../css/no-tab.css";
import "../css/pages/Inscription.css";

function Inscription() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (loading) return;
  }, [user, loading]);

  return (
    <div className="register">
       <div className ="titre">
        <h1>Inscription</h1>
      </div>
      <div className="register__container">
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
         <input
          type="password"
          className="register__textBox"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Confirm your password"
        />
        <div>
          <input type="checkbox" name="ConditionGeneral" value="newsletter" />
          <label for="ConditionGeneral">j'accepte les <Link>condtions général d'utilisation</Link></label>
        </div>
        <button
          className="register__btn"
          onClick={() => register(email, password)}
        >
          Register
        </button>
        <div>
          Already have an account? <Link className="lien" to="#">Login</Link> now.
        </div>

      </div>
    </div>
  );
}
export default Inscription;
