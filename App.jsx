import Routes from "./src/routes/Routes";
import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export default function App() {
	const [user] = useAuthState(auth);

	return <Routes user={user} />;
}
