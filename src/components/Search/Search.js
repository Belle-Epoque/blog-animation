import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  CardTitle,
  CardText
} from "material-ui/Card";
import FlatButton from "material-ui/FlatButton";
import RaisedButton from "material-ui/RaisedButton";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { getArticles, searchMovies, getMovie } from "../../api/api";
import { Link } from "react-router-dom";
import { TweenMax } from "gsap";
import Home from "./../Home/Home";
import "./Search.css";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: []
    };
  }

  render() {
    const movies = this.state.movies;

    return (
      <Fragment>
        <div className="containers">
          <div className="search">
            <input
              className="search__input"
              type="text"
              placeholder="Search Your Film"
              ref={this.props.inputRef}
              onKeyPress={e => {
                if (e.key === "Enter") {
                  this.props.onSearch;
                }
              }}
            />
            <RaisedButton
              className="search__button"
              label="Search"
              primary={true}
              onClick={this.props.onSearch}
            />
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Search;
