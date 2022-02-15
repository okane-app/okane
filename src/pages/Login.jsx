import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { auth, signInWithEmailAndPassword } from "../firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, loading, error] = useAuthState(auth);
    useEffect(() => {
        if (loading) {
            // maybe trigger a loading screen
            return;
        }
        if (user) <Redirect to="/landing" />;
    }, [user, loading]);
    return (
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
                    onClick={() => signInWithEmailAndPassword(auth, email, password)}
                >
                    Login
                </button>
                <div>
                    <Link to="/reset" routerLink="/register"
                    >Forgot Password</Link>
                </div>
                <div>
                    Don't have an account? <Link to="/register">Register</Link> now.
                </div>
            </div>
        </div>
    );
}
export default Login;
