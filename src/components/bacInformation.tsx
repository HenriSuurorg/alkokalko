import React from "react";
import { RouteComponentProps } from "react-router";
import { Line } from "react-chartjs-2";
import "../Style.css";

interface Props
	extends RouteComponentProps<{ id: string }, {}, { currentBac: number; graphBacData: number[] }> {}

const BacInformatin: React.FC<Props> = ({ location, history, match }) => {
	const { currentBac, graphBacData } = location.state;
	let labels = [];

	for (let n in graphBacData) {
		labels.push((parseFloat(n) * 0.01).toFixed(3));
	}

	const editDrinks = () => {
		history.push(`/drinks/${match.params.id}`);
	};

	const editUser = () => {
		history.push("/");
	};

	const graphData = {
		labels: labels,
		datasets: [
			{
				label: "alcohol Content",
				fill: false,
				lineTension: 0.1,
				backgroundColor: "rgba(75,192,192,0.4)",
				borderColor: "rgba(75,192,192,1)",
				borderDashOffset: 0.0,
				borderJoinStyle: "miter",
				pointBorderWidth: 1,
				pointHoverRadius: 5,
				pointHoverBackgroundColor: "rgba(75,192,192,1)",
				pointHoverBorderColor: "rgba(220,220,220,1)",
				pointHoverBorderWidth: 2,
				pointRadius: 1,
				pointHitRadius: 10,
				data: graphBacData
			}
		]
	};

	return (
		<div className="container">
			<h1>Your blood alcohol content: {currentBac}</h1>
			<h1>You will be sober in {Math.round(parseFloat(labels[labels.length - 1]))} hours</h1>
			<button onClick={editDrinks}>Edit drinks</button>
			<button onClick={editUser}>Edit user</button>
			<Line data={graphData} legend={{ display: false }} />
		</div>
	);
};

export default BacInformatin;
