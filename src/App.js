import React, { useEffect } from "react";
import "./App.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import TopBar from "./components/TopBar";
import Register from "./components/Register";
import Shop from "./components/Shop";
import ProductsPage from "./components/ProductsPage";
import MembersPage from "./components/MembersPage";
import Cart from "./components/Cart";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import { usersFromLocal } from "./features/usersSlice";
import { currentFromLocal } from "./features/loggedSlice";
import { shopFromLocal } from "./features/shopSlice";
import { cartFromLocal } from "./features/cartSlice";

function App() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const cart = useSelector((state) => state.cart);
  const shop = useSelector((state) => state.shop);
  const current = useSelector((state) => state.logged);

  useEffect(() => {
    const storedUsers = localStorage.getItem("branded_users");
    const storedCurrent = localStorage.getItem("branded_current");
    const storedShop = localStorage.getItem("branded_shop");

    if (storedUsers) {
      dispatch(usersFromLocal(JSON.parse(storedUsers)));
    }
    if (storedCurrent) {
      dispatch(currentFromLocal(JSON.parse(storedCurrent)));
    }
    if (storedShop) {
      dispatch(shopFromLocal(JSON.parse(storedShop)));
    }
  }, []);

  useEffect(() => {
    const storedCart = localStorage.getItem(`branded_cart${current.id}`);
    if (storedCart) {
      dispatch(cartFromLocal(JSON.parse(storedCart)));
    }
  }, [current]);

  useEffect(() => {
    localStorage.setItem("branded_users", JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem("branded_current", JSON.stringify(current));
  }, [current]);

  useEffect(() => {
    localStorage.setItem("branded_shop", JSON.stringify(shop));
  }, [shop]);
  useEffect(() => {
    localStorage.setItem(`branded_cart${current.id}`, JSON.stringify(cart));
  }, [cart]);

  return (
    <Router>
      <TopBar />
      <div>
        <Switch>
          <Route path="/cart">
            <Cart />
          </Route>
          <Route path="/members">
            <MembersPage />
          </Route>
          <Route path="/products">
            <ProductsPage />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/shop">
            <Shop />
          </Route>
          <Route path="/">
            <Login />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
