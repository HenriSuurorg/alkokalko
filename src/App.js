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
        <Route path="/drinks/:id" exact component={drinksManager} />
        <Route path="/bacinformation/:id" exact component={BacInformatin} />
        <Route path="/" render={() => <h1>404</h1>} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
