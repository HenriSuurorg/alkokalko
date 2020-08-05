import React, { useState } from "react";
import useLocalState from "./useLocalState";
import NewDrinkForm from "./drinkForm";
import BacCalc from "./BacCalc";
import { RouteComponentProps } from "react-router";
import "../Style.css";
import graphDataCalc from "./graphDataCalc";

interface Props extends RouteComponentProps<{ id: string }> {}

const DrinksManager: React.FC<Props> = ({ match, history }) => {
	const userParameters = match.params.id.split(";");

	const [widmarkFactor, setWidmarkFactor] = useState<number>(parseFloat(userParameters[0]));
	const [eliminationRate, setEliminationRate] = useState<number>(parseFloat(userParameters[1]));
	const [absorptionRate, setabsorptionRate] = useState<number>(parseFloat(userParameters[2]));
	const [weight, setWeight] = useState<number>(parseFloat(userParameters[3]));
	const [drinks, setDrinks] = useLocalState("drinks", []);
	const [newDrink, setNewDrink] = useState(false);
	const [duplicateDrinkData, setDuplicateDrinkData] = useState<null | {
		initialType: string;
		initialVolume: string;
		initialUnit: string;
		initialABV: string;
	}>(null);

	const addDrink = () => {
		setNewDrink(true);
	};

	const duplicateDrink = (drink: {
		type: string;
		volume: string;
		unit: string;
		ABV: string;
		timePassed: string;
	}) => {
		setDuplicateDrinkData({
			initialType: drink.type,
			initialVolume: drink.volume,
			initialUnit: drink.unit,
			initialABV: drink.ABV
		});
		setNewDrink(true);
	};

	const deleteDrink = (i: number) => {
		const temp = [...drinks];
		temp.splice(i, 1);
		setDrinks(temp);
	};

	const closeForm = (
		type: string,
		volume: string,
		unit: string,
		ABV: string,
		timePassed: string
	) => {
		setNewDrink(false);
		setDuplicateDrinkData(null);
		setDrinks([{ type, volume, unit, ABV, timePassed }, ...drinks]);
	};

	const calculateBAC = () => {
		console.log("startng bac calculation");
		const currentBac = BacCalc({
			widmarkFactor,
			absorptionRate,
			eliminationRate,
			weight,
			drinks
		});
		const graphBacData = graphDataCalc({
			widmarkFactor,
			absorptionRate,
			eliminationRate,
			weight,
			drinks
		});
		history.push({
			pathname: `/bacinformation/${match.params.id}`,
			state: { currentBac, graphBacData }
		});
	};

	const drinkCards = drinks.map(
		(
			drink: {
				type: string;
				volume: string;
				unit: string;
				ABV: string;
				timePassed: string;
			},
			i: number
		) => {
			return (
				<div className="drink-card" key={i}>
					<button onClick={() => duplicateDrink(drink)}>+</button>
					<h3>{drink.type}</h3>
					<h3>{drink.volume + drink.unit} </h3>
					<h3>{drink.ABV}%</h3>
					<h3>{drink.timePassed} tundi tagasi</h3>
					<button onClick={() => deleteDrink(i)}>DEL</button>
				</div>
			);
		}
	);

	return (
		<div className="container">
			<h1>Drinks manager</h1>
			<div className="button-container">
				<button onClick={addDrink}>ADD DRINK</button>
				<button onClick={calculateBAC}>CALCULATE BAC</button>
			</div>
			{newDrink && (
				<div className="drink-form">
					{" "}
					<NewDrinkForm closeForm={closeForm} duplicateDrinkData={duplicateDrinkData} />
				</div>
			)}
			<div className="drinks">{drinks && drinkCards}</div>
		</div>
	);
};

export default DrinksManager;
