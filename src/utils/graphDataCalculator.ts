import { drinkType } from "../types";
import { drinkSorter } from "./drinkSorter";

export const graphDataCalculator = ({
  widmarkFactor,
  absorptionRate,
  eliminationRate,
  weight,
  drinks,
}: {
  widmarkFactor: number;
  absorptionRate: number;
  eliminationRate: number;
  weight: number;
  drinks: drinkType[];
}) => {
  const drinksInChronologicalOrder = drinkSorter(drinks);

  let maxTime = parseFloat(drinksInChronologicalOrder[0].timePassed);
  let Time = 0;
  let graphData = [];
  let Bac = 0;

  while (Bac >= 0) {
    Bac = 0;
    for (const drink of drinksInChronologicalOrder) {
      if (parseFloat(drink.timePassed) > maxTime - Time) {
        const activeTime = parseFloat(drink.timePassed) - (maxTime - Time);
        const alcoholMass =
          parseFloat(drink.volume) * 0.0007893 * (parseFloat(drink.ABV) / 100);
        const x1 = alcoholMass * (1 - Math.E ** (-absorptionRate * activeTime));
        const y1 = widmarkFactor * weight;
        Bac = Bac + (x1 / y1) * 100;
      }
    }
    if (Bac - Time * eliminationRate < 0) {
      graphData.push(0);
      break;
    }
    graphData.push(Bac - Time * eliminationRate);
    Time = Time + 0.01;
  }
  return graphData;
};
