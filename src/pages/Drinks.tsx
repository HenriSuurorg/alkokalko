import React, { useState } from "react";
import { RouteComponentProps } from "react-router";
import { useLocalStorage } from "../utils/useLocalState";
import { drinkType, duplicateDrinkType } from "../types";
import { DrinkCards } from "../components/DrinkCards";
import { NewDrink } from "../components/NewDrink";
import { bacCalculator } from "../utils/bacCalculator";
import { graphDataCalculator } from "../utils/graphDataCalculator";
import { drinkSorter } from "../utils/drinkSorter";
import { userParameters } from "../utils/userParameters";

interface DrinksProps extends RouteComponentProps<{ id: string }> {}

export const Drinks: React.FC<DrinksProps> = ({ match, history }) => {
  const [drinks, setDrinks] = useLocalStorage("drinks", []);
  const [
    duplicateDrink,
    setDuplicateDrink,
  ] = useState<duplicateDrinkType | null>(null);
  const [addingNewDrink, setAddingNewDrink] = useState(false);

  const {
    widmarkFactor,
    absorptionRate,
    eliminationRate,
    weight,
  } = userParameters(match.params.id);

  const calculateBAC = () => {
    const currentBac2 = bacCalculator({
      widmarkFactor,
      absorptionRate,
      eliminationRate,
      weight,
      drinks,
    });
    const { graphBacData, currentBac, curBacIdx } = graphDataCalculator({
      widmarkFactor,
      absorptionRate,
      eliminationRate,
      weight,
      drinks,
    });
    history.push({
      pathname: `/user/bacinfo/${match.params.id}`,
      state: { currentBac, graphBacData, curBacIdx, currentBac2 },
    });
  };

  const addDuplicateDrink = (drink: drinkType) => {
    setDuplicateDrink({
      type: drink.type,
      volume: drink.volume,
      unit: drink.unit,
      abv: drink.abv,
    });
    setAddingNewDrink(true);
  };

  const closeForm = (
    type: string,
    volume: string,
    unit: string,
    abv: string,
    timePassed: string
  ) => {
    setAddingNewDrink(false);
    setDuplicateDrink(null);
    const temp = [{ type, volume, unit, abv, timePassed }, ...drinks];
    const sortedDrinks = drinkSorter(temp, true);
    setDrinks(sortedDrinks);
  };

  const deleteDrink = (i: number) => {
    const temp = [...drinks];
    temp.splice(i, 1);
    setDrinks(temp);
  };

  return (
    <div className="container drinks__container">
      <div>
        <button
          onClick={() => setAddingNewDrink(true)}
          className="drinks__main-btn drinks__add-btn"
        >
          lisa jook
        </button>
        <button
          onClick={() => calculateBAC()}
          className="drinks__main-btn drinks__submit-btn"
        >
          kinnita
        </button>
        <button onClick={() => history.push("/user")} className="edit-user-btn">
          muuda kasutajat
        </button>
      </div>
      <NewDrink
        closeForm={closeForm}
        duplicateDrinkData={duplicateDrink}
        addingNewDrink={addingNewDrink}
      />
      <DrinkCards
        drinks={drinks}
        deleteDrink={deleteDrink}
        addDuplicateDrink={addDuplicateDrink}
      />{" "}
    </div>
  );
};
