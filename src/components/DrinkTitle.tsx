import React from "react";
import { Beer } from "../icons/beer";
import { Shot } from "../icons/shot";
import { drinkType } from "../types";

interface DrinkTitleProps {
  drink: drinkType;
}

export const DrinkTitle: React.FC<DrinkTitleProps> = ({ drink }) => {
  const type = drink.type;

  if (type === "vodka") {
    return (
      <div className="drinkcard__title">
        <Shot className="drinkcard__shot-icon" />
        <h2>Pits viina</h2>
      </div>
    );
  } else if (type === "beer") {
    return (
      <div className="drinkcard__title">
        <Beer className="drinkcard__beer-icon" />
        <h2>Õlu</h2>
      </div>
    );
  }
  return null;
};
