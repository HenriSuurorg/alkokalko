import { drinkType } from "../types"

export const passedDrinksCounter = (
  descendingDrinks: drinkType[],
  Time: number,
  maxTime: number
) => {
  let count = 0
  for (let i = 0; i < descendingDrinks.length; i++) {
    if (parseFloat(descendingDrinks[i].timePassed) > maxTime - Time) {
      count++
    }
  }
  return count
}
