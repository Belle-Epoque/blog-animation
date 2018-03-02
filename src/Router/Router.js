import React from "react";
import { Route, Switch } from "react-router";
import Home from "./../components/Home/Home";
import Movie from "./../components/Movie/Movie";
import Search from "./../components/Search/Search";

const Router = () => (
    <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/movies/:number" component={Movie} />
		<Route path="/search" component={Search} />
    </Switch>
);

export default Router;