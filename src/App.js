import React from 'react';
import './App.css';

import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import LandingPage from './components/LandingPage';
import TopBar from "./components/TopBar";

function App() {
  return (
    <Router>
      <TopBar/>
      <div>
        <Switch>
          <Route path="/">
            <LandingPage/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
