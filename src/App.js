import React, { Component } from "react";
import Header from "./components/Header/Header";
import Router from "./Router/Router";
import "./App.css";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

class App extends Component {
	render() {
		return (
			<MuiThemeProvider>
				<div className="App">
					<Header />
					<Router />
				</div>
			</MuiThemeProvider>
		);
	}
}

export default App;
