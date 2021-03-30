import React from "react";
import { Beer } from "../icons/Beer";
import { drinkType } from "../types";
import { Wine } from "../icons/Wine";
import { Martini } from "../icons/Martini";
import { Shots } from "../icons/Shots";
import { Whisky } from "../icons/Whisky";
import { Coctail } from "../icons/Coctail";
import { Cognac } from "../icons/Cognac";
import { Mojito } from "../icons/Mojito";

interface DrinkTitleProps {
  drink: drinkType;
}

export const DrinkTitle: React.FC<DrinkTitleProps> = ({ drink }) => {
  const { type } = drink;

  if (type === "shot-vodka") {
    return (
      <div className="drinkcard__title">
        <Shots className="drinkcard__shot-icon" />
        <h2>Pits viina</h2>
      </div>
    );
  } else if (type === "large-beer" || type === "small-beer") {
    return (
      <div className="drinkcard__title">
        <Beer className="drinkcard__beer-icon" />
        <h2>{type === "large-beer" ? "Suur õlu" : "Väike õlu"}</h2>
      </div>
    );
  } else if (type === "glass-wine") {
    return (
      <div className="drinkcard__title">
        <Wine className="drinkcard__wine-icon" />
        <h2>Klaas vein</h2>
      </div>
    );
  } else if (type === "martini") {
    return (
      <div className="drinkcard__title">
        <Martini className="drinkcard__martini-icon" />
        <h2>Martini</h2>
      </div>
    );
  } else if (type === "whisky") {
    return (
      <div className="drinkcard__title">
        <Whisky className="drinkcard__whisky-icon" />
        <h2>Viski</h2>
      </div>
    );
  } else if (type === "coctail") {
    return (
      <div className="drinkcard__title">
        <Coctail className="drinkcard__coctail-icon" />
        <h2>Muu kokteil</h2>
      </div>
    );
  } else if (type === "white-russian") {
    return (
      <div className="drinkcard__title">
        <Whisky className="drinkcard__whisky-icon" />
        <h2>White Russian</h2>
      </div>
    );
  } else if (type === "cognac") {
    return (
      <div className="drinkcard__title">
        <Cognac className="drinkcard__cognac-icon" />
        <h2>Konjak</h2>
      </div>
    );
  } else if (type === "mojito") {
    return (
      <div className="drinkcard__title">
        <Mojito className="drinkcard__mojito-icon" />
        <h2>Mojito</h2>
      </div>
    );
  }

  return null;
};
