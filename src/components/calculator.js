import React from "react";

const exampleUser = {
	weight: "65",
	height: "182",
	age: "18",
	sex: "male",
	stomachState: "full",
	drinkingHabits: "sometimes"
};
const exampleDrinks = [
	{ volume: "50", timePassed: "2.56", ABV: 40 },
	{ volume: "50", timePassed: "1.56", ABV: 40 },
	{ volume: "50", timePassed: "0.56", ABV: 40 }
];

const BacCalculator = () => {
	let widmarkFactor;
	if (exampleUser.sex === "male") {
		widmarkFactor =
			0.62544 +
			parseFloat(exampleUser.height) * 13.664 -
			parseFloat(exampleUser.weight) *
				(0.00189 + 0.002425 / (parseFloat(exampleUser.height) * 100) ** 2); // Prettier v6tab vajalikud sulud ara
	}
};
