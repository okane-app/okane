import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import { auth, register } from "../firebase";

import "../css/no-tab.css";
import "../css/pages/Inscription.css";

function Inscription() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (loading) return;
  }, [user, loading]);

  return (
    
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
          onClick={() => register(username,email, password)}
        >
          Register
        </button>

        <div>
          Already have an account? <Link to="/connexion">Login</Link> now.
        </div>
      </div>
    </div>
  );
}
export default Inscription;
