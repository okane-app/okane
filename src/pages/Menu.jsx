import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import { auth, register } from "../firebase";

import "../css/no-tab.css";
import "../css/pages/Inscription.css";

function Menu() {
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
      <div className="Menu">
     
      </div>
    );
  }
  export default Menu;
  