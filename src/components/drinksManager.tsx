import React, { useState } from "react";
import NewDrinkForm from "./drinkForm";
import { RouteComponentProps } from "react-router";

interface Props extends RouteComponentProps<{ id: string }> {}

const DrinksManager: React.FC<Props> = ({ match }) => {
  const userParameters = match.params.id.split(";");

  const [widmarkFactor, setWidmarkFactor] = useState<number>(
    parseFloat(userParameters[0])
  );
  const [eliminationRate, setEliminationRate] = useState<number>(
    parseFloat(userParameters[1])
  );
  const [absorptionRate, setabsorptionRate] = useState<number>(
    parseFloat(userParameters[2])
  );
  const [weight, setWeight] = useState<number>(parseFloat(userParameters[3]));
  const [drinks, setDrinks] = useState<
    {
      type: string;
      volume: string;
      unit: string;
      ABV: string;
      timePassed: string;
    }[]
  >([]);
  const [newDrink, setNewDrink] = useState(false);

  const clickHandler = () => {
    setNewDrink(true);
  };

  const closeForm = (
    type: string,
    volume: string,
    unit: string,
    ABV: string,
    timePassed: string
  ) => {
    setNewDrink(false);
    setDrinks([...drinks, { type, volume, unit, ABV, timePassed }]);
  };

  return (
    <div className="container">
      <h1>Drinks manager</h1>
      <button onClick={clickHandler}>ADD DRINK</button>
      <div>{newDrink && <NewDrinkForm closeForm={closeForm} />}</div>
      <div className="drinks"></div>
    </div>
  );
};

export default DrinksManager;
