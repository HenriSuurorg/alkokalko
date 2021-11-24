import React from "react"
import { drinkType } from "../types"
import { CgMathPlus } from "react-icons/cg"
import { DrinkTitle } from "./DrinkTitle"

interface DrinkCardsProps {
  deleteDrink: (i: number) => void
  addDuplicateDrink: (drink: drinkType) => void
  drinks: drinkType[] | null
}

export const DrinkCards: React.FC<DrinkCardsProps> = ({
  deleteDrink,
  addDuplicateDrink,
  drinks,
}) => {
  if (!drinks) {
    return null
  }
  const drinksJSX = drinks.map((drink: drinkType, i: number) => {
    return (
      <div className="drinkcard__container" key={i}>
        <DrinkTitle drink={drink} />
        <div className="drinkcard__parameter-container">
          <h4>Kui palju?</h4>
          <h3>
            <b>{drink.volume}</b>
            {drink.unit}{" "}
          </h3>
        </div>
        <hr className="drinkcard__line" />
        <div className="drinkcard__parameter-container">
          <h4>Kui kange?</h4>
          <h3>
            <b>{drink.abv}</b>%
          </h3>
        </div>
        <div className="drinkcard__parameter-container">
          <h4>Mitu tundi tagasi?</h4>
          <h3>
            <b>{drink.timePassed}</b>{" "}
            {drink.timePassed === "1" ? "tund" : "tundi"}
            {window.screen.width < 680 ? " tagasi" : null}
          </h3>
        </div>
        <CgMathPlus
          className="drinkcard__del-icon drinkcard__action-icon"
          onClick={() => deleteDrink(i)}
        />
        <CgMathPlus
          className="drinkcard__plus-icon drinkcard__action-icon"
          onClick={() => addDuplicateDrink(drink)}
        />
      </div>
    )
  })

  return <div className="drinkcard__drinkcards">{drinksJSX}</div>
}
