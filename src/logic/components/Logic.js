import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import MainPage from "./MainPage";

const Logic = () => {
  return (
    <BrowserRouter basename="/">
      <div className="app">
        <Switch>
          <Route exact path="/" component={MainPage} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default Logic;
