import React from "react";

const exampleUser = {
	weight: "65",
	height: "182",
	age: "18",
	sex: "female",
	stomachState: "empty",
	drinkingHabits: "sometimes"
};
const exampleDrinks = [
	{ volume: "50", unit: "ml", timePassed: "2.56", ABV: 40 },
	{ volume: "50", unit: "ml", timePassed: "1.56", ABV: 40 },
	{ volume: "50", unit: "ml", timePassed: "0.56", ABV: 40 }
];

const BacCalculator = () => {
	let widmarkFactor;
	let elimintaionRate;
	let absorptionRate;
	let massOfAlcohol;

	if (exampleUser.sex === "male") {
		widmarkFactor =
			0.62544 +
			(0.13664 * parseFloat(exampleUser.height)) / 100 -
			parseFloat(exampleUser.weight) *
				(0.00189 + 0.002425 / (parseFloat(exampleUser.height) / 100) ** 2) +
			(1 / parseFloat(exampleUser.weight)) *
				(0.57986 +
					2.545 * (parseFloat(exampleUser.height) / 100) -
					0.02255 * parseFloat(exampleUser.age));
	} else {
		widmarkFactor =
			0.50766 +
			(0.11165 * parseFloat(exampleUser.height)) / 100 -
			parseFloat(exampleUser.weight) *
				(0.001612 + 0.0031 / (parseFloat(exampleUser.height) / 100) ** 2) -
			(1 / parseFloat(exampleUser.weight)) *
				(0.62115 - 3.1665 * (parseFloat(exampleUser.height) / 100));
	}

	if (exampleUser.stomachState === "full") absorptionRate = 2.3;
	else if (exampleUser.stomachState === "average") absorptionRate = 4.4;
	else if (exampleUser.stomachState === "empty") absorptionRate = 6.5;

	if (exampleUser.drinkingHabits === "often") elimintaionRate = 0.02;
	else if (exampleUser.drinkingHabits === "sometimes") elimintaionRate = 0.0175;
	else if (exampleUser.drinkingHabits === "rarely") elimintaionRate = 0.015;

	return (
		<div>
			<h1>widmarkFactor: {widmarkFactor} </h1>
			<h1>absorptionRate: {absorptionRate} </h1>
		</div>
	);
};

export default BacCalculator;
