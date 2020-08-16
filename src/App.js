import React from "react";
import "./App.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import TopBar from "./components/TopBar";
import Register from "./components/Register";
import Shop from "./components/Shop";
import ProductsPage from "./components/ProductsPage";
import MembersPage from "./components/MembersPage";

function App() {
  return (
    <Router>
      <TopBar />
      <div>
        <Switch>
          <Route path="/members">
            <MembersPage/>
          </Route>
          <Route path="/products">
            <ProductsPage/>
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/shop">
            <Shop />
          </Route>
          <Route path="/">
            <LandingPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
