import React from "react";

interface Props {
	weight: string, 
	height: string, 
	age: string, 
	sex: string, 
	stomachState: string | undefined | number,
	drinkingHabits: string | undefined | number
}

const ParamCalculator: React.FC<Props>  = ({weight, height, age, sex, drinkingHabits, stomachState}) => {
	let widmarkFactor;
	let elimintaionRate;
	let absorptionRate;

	if (sex === "male") {
		widmarkFactor =
			0.62544 +
			(0.13664 * parseFloat(height)) / 100 -
			parseFloat(weight) *
				(0.00189 + 0.002425 / (parseFloat(height) / 100) ** 2) +
			(1 / parseFloat(weight)) *
				(0.57986 +
					2.545 * (parseFloat(height) / 100) -
					0.02255 * parseFloat(age));
	} else {
		widmarkFactor =
			0.50766 +
			(0.11165 * parseFloat(height)) / 100 -
			parseFloat(weight) *
				(0.001612 + 0.0031 / (parseFloat(height) / 100) ** 2) -
			(1 / parseFloat(weight)) *
				(0.62115 - 3.1665 * (parseFloat(height) / 100));
	}

	if (stomachState === "full") absorptionRate = 2.3;
	else if (stomachState === "average") absorptionRate = 4.4;
	else if (stomachState === "empty") absorptionRate = 6.5;

	if (drinkingHabits === "often") elimintaionRate = 0.02;
	else if (drinkingHabits === "sometimes") elimintaionRate = 0.0175;
	else if (drinkingHabits === "rarely") elimintaionRate = 0.015;

	return (
		<div>
			<h1>widmarkFactor: {widmarkFactor} </h1>
			<h1>absorptionRate: {absorptionRate} </h1>
			<h1>eliminationRate: {elimintaionRate} </h1>
		</div>
	);
};

export default ParamCalculator;
