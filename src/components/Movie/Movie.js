import React, { Component, Fragment } from "react";
import { getMovie } from "../../api/api";
import BlackBox from "./BlackBox.js";
import "./Movie.css";

class Movie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: {}
    };
  }

  componentDidMount() {
    this.refreshSingleMovie(this.props.match.params.number);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.number !== this.props.match.params.number) {
      // Fix bug: force to refresh movie state when movie id change.
      this.refreshSingleMovie(nextProps.match.params.number);
    }
  }

  async refreshSingleMovie(movieId) {
    const filterMovie = await getMovie(movieId);

    if (!filterMovie) {
      // This movie doesn't exist.
      return;
    }

    this.setState({
      movie: filterMovie
    });
  }

  render() {
    const { movie: { title, year, poster, director, actors, plot } } = this.state;

    return (
      <div className="content">
        <div className="Movie-img" style={{ backgroundImage: `url(${poster})` }}>
          <BlackBox reverseDirection={false} />
          <BlackBox reverseDirection={true} />
          <BlackBox reverseDirection={false} />
          <BlackBox reverseDirection={true} />
        </div>
        <div className="container">
          <div className="Movie-body">
            <h1 className="title">{title}</h1>
            <h2 className="director">{director}</h2>
            <h3 className="year">{year}</h3>
            <h2 className="subtitle">Actors</h2>
            <p className="actor">{actors}</p>
            <p className="plot">{plot}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Movie;
