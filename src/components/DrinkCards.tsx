import React from "react";
import { drinkType } from "../types";

interface DrinkCardsProps {
  deleteDrink: (i: number) => void;
  addDuplicateDrink: (drink: drinkType) => void;
  drinks: drinkType[] | null;
}

export const DrinkCards: React.FC<DrinkCardsProps> = ({
  deleteDrink,
  addDuplicateDrink,
  drinks,
}) => {
  if (!drinks) {
    return null;
  }
  const drinksJSX = drinks.map((drink: drinkType, i: number) => {
    return (
      <div
        className="drink-card"
        key={i}
        style={{ backgroundColor: "gray", margin: "10px" }}
      >
        <button onClick={() => addDuplicateDrink(drink)}>+</button>
        <h3>{drink.type}</h3>
        <h3>{drink.volume + drink.unit} </h3>
        <h3>{drink.abv}%</h3>
        <h3>{drink.timePassed} tundi tagasi</h3>
        <button onClick={() => deleteDrink(i)}>DEL</button>
      </div>
    );
  });

  return <div>{drinksJSX}</div>;
};
