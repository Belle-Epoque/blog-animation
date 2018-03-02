import React from "react";
import { Route, Switch } from "react-router";
import Home from "./../components/Home/Home";
import About from "./../components/About/About";
import Article from "./../components/Article/Article";
import Page from "./../components/Page/Page";
import Movie from "./../components/Movie/Movie";

const Router = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/about" component={About} />
    <Route path="/page" component={Page} />
    <Route path="/article/:number" component={Article} />
    <Route path="/movie/:number" component={Movie} />
  </Switch>
);

export default Router;
