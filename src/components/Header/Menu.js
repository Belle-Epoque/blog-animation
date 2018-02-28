import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { List, ListItem } from "material-ui/List";
import { Link } from "react-router-dom";
import FlatButton from "material-ui/FlatButton";
import "./Menu.css";

const Menu = ({ open, closeMenu }) => (
  <Fragment>
    <div
      className="Overlay"
      style={{ opacity: open ? `1` : `0`, display: open ? `block` : `none` }}
    />
    <List
      className="Menu"
      style={{
        traslateX: open ? `left` : `right`,
        transform: open ? `translateX(0)` : `translateX(-100%)`
      }}
    >
      <ListItem>
        <Link className="Menu-link" onClick={e => closeMenu()} to="/">
          Home
        </Link>
      </ListItem>
      <ListItem>
        <Link className="Menu-link" onClick={e => closeMenu()} to="/about">
          About
        </Link>
      </ListItem>
      <ListItem>
        <Link className="Menu-link" onClick={e => closeMenu()} to="/article/1">
          Article #1
        </Link>
      </ListItem>
      <ListItem>
        <Link className="Menu-link" onClick={e => closeMenu()} to="/article/2">
          Article #2
        </Link>
      </ListItem>
      <ListItem>
        <Link className="Menu-link" onClick={e => closeMenu()} to="/page">
          Page
        </Link>
      </ListItem>
    </List>
  </Fragment>
);

Menu.propTypes = {
  open: PropTypes.bool
};

export default Menu;
