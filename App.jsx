import Routes from "./src/routes/Routes";
import TimeAgo from "javascript-time-ago";
import { auth } from "./firebase";
import fr from "javascript-time-ago/locale/fr";
import { useAuthState } from "react-firebase-hooks/auth";

TimeAgo.addDefaultLocale(fr);

export default function App() {
	const [user] = useAuthState(auth);
	return <Routes user={user} />;
}
