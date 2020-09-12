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
    // const currentBac = bacCalculator({
    //   widmarkFactor,
    //   absorptionRate,
    //   eliminationRate,
    //   weight,
    //   drinks,
    // });
    const { graphBacData, currentBac, curBacIdx } = graphDataCalculator({
      widmarkFactor,
      absorptionRate,
      eliminationRate,
      weight,
      drinks,
    });
    history.push({
      pathname: `/user/bacinfo/${match.params.id}`,
      state: { currentBac, graphBacData, curBacIdx },
    });
  };

  const addDuplicateDrink = (drink: drinkType) => {
    setDuplicateDrink({
      type: drink.type,
      volume: drink.volume,
      unit: drink.unit,
      ABV: drink.ABV,
    });
    setAddingNewDrink(true);
  };

  const closeForm = (
    type: string,
    volume: string,
    unit: string,
    ABV: string,
    timePassed: string
  ) => {
    setAddingNewDrink(false);
    setDuplicateDrink(null);
    const temp = [{ type, volume, unit, ABV, timePassed }, ...drinks];
    const sortedDrinks = drinkSorter(temp, true);
    setDrinks(sortedDrinks);
  };

  const deleteDrink = (i: number) => {
    const temp = [...drinks];
    temp.splice(i, 1);
    setDrinks(temp);
  };

  return (
    <div>
      <div>
        <button onClick={() => setAddingNewDrink(true)}>lisa jook</button>
        <button onClick={() => calculateBAC()}>kinnita</button>
        <button onClick={() => history.push("/user")}>muuda kasutajat</button>
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
