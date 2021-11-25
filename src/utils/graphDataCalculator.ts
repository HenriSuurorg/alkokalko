import { drinkType } from "../types"
import { drinkSorter } from "./drinkSorter"
import { passedDrinksCounter } from "./passedDrinkCounter"

// https://docs.google.com/document/d/1J8gMJdqBdbox462-ERcvf5BYWfcBHa0Hvqrgw0T2bLs/edit

export const graphDataCalculator = ({
  widmarkFactor,
  absorptionRate,
  eliminationRate,
  weight,
  drinks,
}: {
  widmarkFactor: number
  absorptionRate: number
  eliminationRate: number
  weight: number
  drinks: drinkType[]
}) => {
  let descendingDrinks = drinkSorter(drinks, false)

  let justDrank =
    parseFloat(descendingDrinks[descendingDrinks.length - 1].timePassed) < 0.3
  let maxTime = parseFloat(descendingDrinks[0].timePassed)
  let curBacIdx = maxTime / 0.01 - 1
  let Time = 0
  let graphBacData: number[] = []
  let Bac = 0

  while (Bac >= 0) {
    Bac = 0
    for (const drink of descendingDrinks) {
      if (parseFloat(drink.timePassed) > maxTime - Time) {
        const activeTime = parseFloat(drink.timePassed) - (maxTime - Time)
        const alcoholMass =
          parseFloat(drink.volume) * 0.0007893 * (parseFloat(drink.abv) / 100)
        const numerator =
          alcoholMass * (1 - Math.E ** (-absorptionRate * activeTime))
        const denominator = widmarkFactor * weight
        Bac = Bac + (numerator / denominator) * 100
      }
    }
    if (Bac - Time * eliminationRate < 0 && Time > maxTime) {
      graphBacData.push(0)
      break
    } else if (Bac - Time * eliminationRate < 0) {
      let soberTime = maxTime - Time

      if (descendingDrinks.length === 1) {
        graphBacData = graphBacData.concat(
          Array(Math.round(soberTime / 0.01)).fill(0)
        )
        curBacIdx = graphBacData.length - 1
        break
      } else {
        const passsedDrinks = passedDrinksCounter(
          descendingDrinks,
          Time,
          maxTime
        )
        if (passsedDrinks === descendingDrinks.length) {
          graphBacData = graphBacData.concat(
            Array(Math.round(soberTime / 0.01)).fill(0)
          )
          curBacIdx = graphBacData.length - 1
          break
        } else {
          soberTime =
            parseFloat(descendingDrinks[passsedDrinks - 1].timePassed) -
            Time -
            parseFloat(descendingDrinks[passsedDrinks].timePassed)
          graphBacData = graphBacData.concat(
            Array(Math.round(soberTime / 0.01)).fill(0)
          )
          descendingDrinks.splice(0, passsedDrinks)
          maxTime = parseFloat(descendingDrinks[0].timePassed)
          Time = 0
        }
      }
    } else {
      graphBacData.push((Bac - Time * eliminationRate) * 10)
      Time += 0.01
    }
  }
  let soberingIdx = justDrank ? curBacIdx + 30 : curBacIdx
  return {
    graphBacData,
    currentBac: graphBacData[curBacIdx],
    curBacIdx,
    soberingIdx,
  }
}
