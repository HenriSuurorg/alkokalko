import { drinkType } from '../types';
import { drinkSorter } from './drinkSorter';

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
  const curBacIdx = maxTime / 0.01;
  let Time = 0;
  let graphBacData = [];
  let Bac = 0;

  while (Bac >= 0) {
    Bac = 0;
    for (const drink of descendingDrinks) {
      if (parseFloat(drink.timePassed) > maxTime - Time) {
        const activeTime = parseFloat(drink.timePassed) - (maxTime - Time);
        const alcoholMass =
          parseFloat(drink.volume) * 0.0007893 * (parseFloat(drink.abv) / 100);
        const numerator =
          alcoholMass * (1 - Math.E ** (-absorptionRate * activeTime));
        const denominator = widmarkFactor * weight;
        Bac = Bac + (numerator / denominator) * 100;
      }
    }
    if (Bac - Time * eliminationRate < 0 && Time > maxTime) {
      graphBacData.push(0);
      break;
    }
    if (Bac - Time * eliminationRate < 0) {
      const soberTime =
        parseFloat(descendingDrinks[0].timePassed) -
        parseFloat(descendingDrinks[1].timePassed) -
        Time;
      const multiplier = soberTime / 0.01;
      for (let i = multiplier; i >= 0; i--) {
        graphBacData.push(0);
      }
      descendingDrinks.shift();
      if (descendingDrinks.length === 1) {
        graphBacData.push(0);
        break;
      }
      maxTime = parseFloat(descendingDrinks[0].timePassed);
      Time = 0;
    } else {
      graphBacData.push((Bac - Time * eliminationRate) * 10); // Time on liiga suur
      Time = Time + 0.01;
    }
  }
  return { graphBacData, currentBac: graphBacData[curBacIdx], curBacIdx };
};
