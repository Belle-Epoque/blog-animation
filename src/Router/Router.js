import React from "react";
import { Route, Switch } from "react-router";
import Home from "./../components/Home/Home";
import Search from "./../components/Search/Search";
import Details from "./../components/Details/Details";

const Router = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/search" component={Search} />
    <Route path="/details/:movieId" component={Details} />
  </Switch>
);

export default Router;
