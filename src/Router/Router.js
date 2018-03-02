import React from "react";
import { Route, Switch } from "react-router";
import Home from "./../components/Home/Home";
import About from "./../components/About/About";
import Movie from "../components/Movie/Movie";
import Page from "./../components/Page/Page";

const Router = () => (
	<Switch>
		<Route exact path="/" component={Home} />
		<Route path="/about" component={About} />
		<Route path="/page" component={Page} />
		<Route path="/Movie/:number" component={Movie} />
	</Switch>
);

export default Router;
