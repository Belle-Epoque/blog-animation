import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import IconButton from "material-ui/IconButton";
import NavigationClose from "material-ui/svg-icons/navigation/close";
import AppBar from "material-ui/AppBar";
import Menu from "./Menu.js";
import logo from "./logo.svg";
import "./Header.css";

class Header extends Component {
  constructor() {
    super();
    this.state = {
      open: false
    };
  }

  handleClick() {
    this.setState({
      open: !this.state.open
    });
  }
  render() {
    return (
      <Fragment>
        <AppBar
          className="AppBar"
          title="Blog"
          onLeftIconButtonClick={() => this.handleClick()}
          iconElementLeft={
            <div className="Menu-icon">
              <span />
              <span />
              <span />
            </div>
          }
        />
        <Menu open={this.state.open} />
      </Fragment>
    );
  }
}

export default Header;
