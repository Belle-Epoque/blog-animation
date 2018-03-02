import React, { Component, Fragment } from "react";
import AppBar from "material-ui/AppBar";
import FontIcon from "material-ui/FontIcon";
import Menu from "./Menu.js";
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

  forceCloseMenu() {
    this.setState({
      open: false
    });
  }

  render() {
    return (
      <Fragment>
        <AppBar
          className="AppBar"
          title="Catalogue de films"
          onLeftIconButtonClick={() => this.handleClick()}
          onElementLeft={
            <div className="Menu-icon">
              <span />
              <span />
              <span />
            </div>
          }
        />
        <Menu open={this.state.open} closeMenu={() => this.forceCloseMenu()} />
      </Fragment>
    );
  }
}
export default Header;
