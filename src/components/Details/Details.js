import React, { Component, Fragment } from "react";
import Transition from "react-transition-group/Transition";
import { getArticles, searchMovies, getMovie } from "../../api/api";
import RaisedButton from "material-ui/RaisedButton";
import "./Details.css";
import { Divider } from "material-ui";
import { presets } from "react-motion";

class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: []
    };
  }

  componentDidMount() {
    this.refreshSingleMovie(this.props.match.params.movieId);
  }

  async refreshSingleMovie(movieId) {
    const filterMovies = await getMovie(movieId);
    this.setState({
      movies: filterMovies
    });
    console.log(this.state.movies);
  }

  render() {
    const actors = this.state.movies.actors;
    console.log(actors);
    return (
      <Fragment>
        <div className="details-container">
          <div className="details-container__image">
            <img src={this.state.movies.poster} />
          </div>
          <div className="details-container__descrption">
            <h1>{this.state.movies.title}</h1>
            <div>
              <ul>{(actors || []).map((actors, i) => <li>{actors}</li>)}</ul>
            </div>
            <div>
              <p classNames="resume">{this.state.movies.plot}</p>
            </div>
            <div>
              <a href={this.state.movies.website}>
                <p>{this.state.movies.website}</p>
              </a>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Details;
