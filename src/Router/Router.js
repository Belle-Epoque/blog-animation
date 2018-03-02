import React from "react";
import { Route, Switch } from "react-router";
import Home from "./../components/Home/Home";
import Media from "./../components/Media/Media";

const Router = () => (
	<Switch>
		<Route exact path="/" component={Home} />
		<Route exact path="/media/:id" component={Media} />
	</Switch>
);

export default Router;
