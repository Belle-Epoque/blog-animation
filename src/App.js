import React, { Component } from "react";
import Header from "./components/Header/Header";
import Router from "./Router/Router";
import "./App.css";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {grey900} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
class App extends Component {
	render() {
		const muiTheme = getMuiTheme({
			palette: {
			  textColor: grey900,
			},
			appBar: {
			  height: 50,
			  color: grey900,
			},
		  });

		return (
			<MuiThemeProvider muiTheme={muiTheme}>
				<div className="App">
					<Header />
					<Router />
				</div>
			</MuiThemeProvider>
		);
	}
}

export default App;
