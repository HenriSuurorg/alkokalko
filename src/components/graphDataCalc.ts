const graphDataCalc = ({
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
  drinks: {
    type: string;
    volume: string;
    unit: string;
    ABV: string;
    timePassed: string;
  }[];
}) => {
  const drinksInChronologicalOrder = drinks.sort(
    (
      a: {
        type: string;
        volume: string;
        unit: string;
        ABV: string;
        timePassed: string;
      },
      b: {
        type: string;
        volume: string;
        unit: string;
        ABV: string;
        timePassed: string;
      }
    ) => parseFloat(b.timePassed) - parseFloat(a.timePassed)
  );

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

export default graphDataCalc;
