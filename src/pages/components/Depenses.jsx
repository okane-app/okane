import { collection, getDocs } from "firebase/firestore";

import { Component } from "react";
import { db } from "../../firebase";

class Depenses extends Component {
	constructor(props) {
		super(props);
		this.state = { dernieresDepenses: [], user: props.user };
	}

	getDepenses = async () => {
		const depenses = [];
		await getDocs(
			collection(db, "users", this.state.user.uid.toString(), "categories")
		).then((categoriesRef) => {
			categoriesRef.docs.forEach(async (categorie) => {
				await getDocs(
					collection(
						db,
						"users",
						this.state.user.uid.toString(),
						"categories",
						categorie.id,
						"depenses"
					)
				).then((depensesRef) => {
					depensesRef.docs.forEach((depense) => {
						depenses.push({ ...depense.data(), id: depense.id });
					});
				});
			});
		});
		return depenses;
	};

	componentDidMount() {
		this.getDepenses().then((depenses) => {
			this.setState({ dernieresDepenses: depenses });
		});
	}

	// shouldComponentUpdate() {
	// 	return true;
	// }

	render() {
		console.log(this.state.dernieresDepenses);

		return (
			<>
				<h1>Dernières dépenses</h1>
				<ul>
					{this.state.dernieresDepenses.map((depense) => {
						return (
							<li key={depense.id}>
								{JSON.stringify(this.state.dernieresDepenses)}
							</li>
						);
					})}
				</ul>
			</>
		);
	}
}

export default Depenses;
