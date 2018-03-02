import React from "react";
import { Route, Switch } from "react-router";
import Home from "./../components/Home/Home";
import SingleMovie from "./../components/SingleMovie/SingleMovie";
// import Page from "./../components/Page/Page";

const Router = () => (
	<Switch>
		<Route exact path="/" component={Home} />
		<Route path="/movie/:number" component={SingleMovie} />
	</Switch>
);

export default Router;
