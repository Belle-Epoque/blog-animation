import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import AppBar from "material-ui/AppBar";
import "./Header.css";

class Header extends Component {

  render() {
    return (
      <Fragment>
        <Link to="/">
          <AppBar
            className="AppBar"
            title="Pulp"
          />
        </Link>
      </Fragment>
    );
  }
}

export default Header;
