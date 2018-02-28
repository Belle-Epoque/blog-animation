import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import AppBar from 'material-ui/AppBar';
import logo from "./logo.svg";
import "./Header.css";
import FlatButton from 'material-ui/FlatButton';

class Header extends Component {
	handleClick() {
		console.log('onClick triggered on the title component');
	}
	render() {
		return (
			<Fragment>
				<AppBar
					className="AppBar"
					title="Blog"
					onLeftIconButtonClick={() => this.handleClick()}
					iconElementLeft={<IconButton><NavigationClose /></IconButton>}
				/>
				<header className="Header">
					<img src={logo} className="Header-logo" alt="logo" />
					<h1 className="Header-title">Welcome to React</h1>
					<ul className="Header-menu">
						<li>
							<Link to="/">Home</Link>
						</li>
						<li>
							<Link to="/about">About</Link>
						</li>
						<li>
							<Link to="/article/1">Article #1</Link>
						</li>
						<li>
							<Link to="/article/2">Article #2</Link>
						</li>
						<li>
							<Link to="/page">Page</Link>
						</li>
					</ul>
				</header>
			</Fragment>
		);
	}
}

export default Header;
