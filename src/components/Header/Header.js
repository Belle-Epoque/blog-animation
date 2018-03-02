import React, { Component, Fragment } from "react";
import AppBar from "material-ui/AppBar";
import SelectField from "material-ui/SelectField";
import SearchBar from "material-ui-search-bar";
//import { SearchBox, SearchkitComponent, SearchkitProvider } from "searchkit";
import Select from "../Select/Select";
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
          title="Movies"
          onLeftIconButtonClick={() => this.handleClick()}
          iconElementLeft={
            <div className="Menu-icon">
              <span />
              <span />
              <span />
            </div>
          }
        />
        <Menu open={this.state.open} closeMenu={() => this.forceCloseMenu()} />
        <SearchBar
          onChange={this.handleChange}
          onRequestSearch={() => console.log("onRequestSearch")}
          style={{
            margin: "0 auto",
            maxWidth: 400
          }}
        />
        <Select />
      </Fragment>
    );
  }
}

export default Header;
