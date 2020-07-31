import React from "react";
import "./Style.css";
import UserForm from "./components/userForm";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import drinksManager from "./components/drinksManager";
import BacInformatin from "./components/bacInformation";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={UserForm} />
        <Route path="/drinks/:id" component={drinksManager} />
        <Route path="/bacinformation" component={BacInformatin} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
