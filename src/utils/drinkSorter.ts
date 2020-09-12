import { drinkType } from "../types";

export const drinkSorter = (drinks: drinkType[], ascending?: boolean) => {
  if (ascending) {
    return drinks.sort(
      (a: drinkType, b: drinkType) =>
        parseFloat(a.timePassed) - parseFloat(b.timePassed)
    );
  }

  return drinks.sort(
    (a: drinkType, b: drinkType) =>
      parseFloat(b.timePassed) - parseFloat(a.timePassed)
  );
};
