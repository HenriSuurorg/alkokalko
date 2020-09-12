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
  let descendingDrinks = drinkSorter(drinks, false);

  let maxTime = parseFloat(descendingDrinks[0].timePassed);
  let Time = 0;
  let graphData = [];
  let Bac = 0;

  while (Bac >= 0) {
    Bac = 0;
    for (const drink of descendingDrinks) {
      if (parseFloat(drink.timePassed) > maxTime - Time) {
        const activeTime = parseFloat(drink.timePassed) - (maxTime - Time);
        const alcoholMass =
          parseFloat(drink.volume) * 0.0007893 * (parseFloat(drink.ABV) / 100);
        const x1 = alcoholMass * (1 - Math.E ** (-absorptionRate * activeTime));
        const y1 = widmarkFactor * weight;
        Bac = Bac + (x1 / y1) * 100;
      }
    }
    if (Bac - Time * eliminationRate < 0 && Time > maxTime) {
      graphData.push(0);
      break;
    }
    if (Bac - Time * eliminationRate < 0) {
      // const soberTime = parseFloat(descendingDrinks[0].timePassed) - parseFloat(descendingDrinks[1].timePassed) - Time
      graphData.push(0);
      Time = Time + 0.01;
    } else {
      graphData.push(Bac - Time * eliminationRate); // Time on liiga suur
      Time = Time + 0.01;
    }
  }
  return graphData;
};
