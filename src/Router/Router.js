import React from "react";
import { Route, Switch } from "react-router";
import Home from "./../components/Home/Home";
import Article from "./../components/Article/Article";

const Router = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/article/:id" component={Article} />
  </Switch>
);

export default Router;
