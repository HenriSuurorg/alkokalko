const exampleDrinks = [
  { type: "vodka", volume: "50", unit: "ml", timePassed: "1.90", ABV: "40" },
  { type: "vodka", volume: "50", unit: "ml", timePassed: "2.56", ABV: "40" },
  { type: "vodka", volume: "50", unit: "ml", timePassed: "1.56", ABV: "40" },
  { type: "vodka", volume: "50", unit: "ml", timePassed: "1.76", ABV: "40" },
  { type: "vodka", volume: "50", unit: "ml", timePassed: "1.86", ABV: "40" },
  { type: "vodka", volume: "50", unit: "ml", timePassed: "2.86", ABV: "40" },
];

const BACCalc = ({
  widmarkFactor,
  absorptionRate,
  eliminationRate,
  weight,
}: {
  widmarkFactor: number;
  absorptionRate: number;
  eliminationRate: number;
  weight: string;
}) => {
  const drinksInChronologicalOrder = exampleDrinks.sort(
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

  let totalBac = drinksInChronologicalOrder.reduce(
    (
      acc: number,
      curDrink: {
        type: string;
        volume: string;
        unit: string;
        ABV: string;
        timePassed: string;
      },
      i: number
    ) => {
      let alcoholMass: number = 0;
      if (curDrink.unit === "ml") {
        alcoholMass =
          parseFloat(curDrink.volume) *
          0.0007893 *
          (parseFloat(curDrink.ABV) / 100);
      }

      let x =
        alcoholMass *
        (1 - Math.E ** (-absorptionRate * parseFloat(curDrink.timePassed)));
      let y = widmarkFactor * parseFloat(weight);

      const curDrinkBac = (x / y) * 100;
      let curBac = 0;
      if (i === drinksInChronologicalOrder.length - 1) {
        curBac =
          acc + curDrinkBac - parseFloat(curDrink.timePassed) * eliminationRate;
      } else {
        curBac =
          acc +
          curDrinkBac -
          (parseFloat(curDrink.timePassed) -
            parseFloat(drinksInChronologicalOrder[i + 1].timePassed)) *
            eliminationRate;
      }

      console.log(`--------[DRINK NUMBER: ${i + 1}]--------`);
      console.log(`Type: ${curDrink.type}`);
      console.log(`BAC before: ${acc.toFixed(4)}`);
      console.log(`BAC after: ${curBac.toFixed(4)}`);
      console.log(`---------------------------------`);

      return curBac;
    },
    0
  );
  console.log("total BAC: ", totalBac);
};

export default BACCalc;
