import React from "react"
import Home from "./pages/Home"
import { Switch, Route, HashRouter } from "react-router-dom"
import { User } from "./pages/User"
import { Drinks } from "./pages/Drinks"
import { BacInfo } from "./pages/BacInfo"

function App() {
  return (
    <HashRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/user" exact component={User} />
        <Route path="/user/drinks/:id" exact component={Drinks} />
        <Route path="/user/bacinfo/:id" exact component={BacInfo} />
        <Route path="/" render={() => <h1>404 :(</h1>} />
      </Switch>
    </HashRouter>
  )
}

export default App
