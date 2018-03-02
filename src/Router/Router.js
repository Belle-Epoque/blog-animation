import React from "react";
import { Route, Switch } from "react-router";
import Home from "./../components/Home/Home";
// import Accueil from "./../components/Accueil/Accueil";
import About from "./../components/About/About";
import Article from "./../components/Article/Article";
import Page from "./../components/Page/Page";

const Router = () => (
	<Switch>
		<Route exact path="/" component={Home} />
        {/* <Route exact path="/" component={Accueil} /> */}
		<Route path="/about" component={About} />
		<Route path="/page" component={Page} />
		<Route path="/article/:number" component={Article} />
	</Switch>
);

export default Router;
