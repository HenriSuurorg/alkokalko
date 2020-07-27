import BACCalc from "./BacCalc";

const userParamCalc = (
  weight: string,
  height: string,
  age: string,
  sex: string,
  stomachState: string,
  drinkingHabits: string
) => {
  let widmarkFactor = 0;
  let eliminationRate = 0;
  let absorptionRate = 0;

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
  else if (stomachState === "mostly-full") absorptionRate = 3.35;
  else if (stomachState === "average") absorptionRate = 4.4;
  else if (stomachState === "mostly-empty") {
    absorptionRate = 5.45;
    eliminationRate = -0.0025;
  } else if (stomachState === "empty") {
    absorptionRate = 6.5;
    eliminationRate = -0.005;
  }

  if (drinkingHabits === "everyday") eliminationRate = eliminationRate + 0.0225;
  else if (drinkingHabits === "often") eliminationRate = eliminationRate + 0.02;
  else if (drinkingHabits === "sometimes")
    eliminationRate = eliminationRate + 0.0175;
  else if (drinkingHabits === "rarely")
    eliminationRate = eliminationRate + 0.015;

  BACCalc({ widmarkFactor, eliminationRate, absorptionRate, weight });
  return { widmarkFactor, eliminationRate, absorptionRate, weight };
};

export default userParamCalc;
