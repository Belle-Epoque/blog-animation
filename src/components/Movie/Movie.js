import React, { Component, Fragment } from "react";
import { getMovie } from "../../api/api";
//import BlackBox from "./BlackBox.js";
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
    const { movie: { title, countries, plot, poster } } = this.state;

    return (
      <Fragment>
        <div
          className="Poster-img"
          style={{ backgroundImage: `url(${poster})` }}
        >
          {/* <BlackBox reverseDirection={false} />
          <BlackBox reverseDirection={true} />
          <BlackBox reverseDirection={false} />
          <BlackBox reverseDirection={true} /> */}
        </div>
        <div className="container">
          <div className="Movie-body">
            <h1 className="Movie-title">{title}</h1>
            <p>{countries}</p>
            <p>{plot}</p>
            <p>{poster}</p>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Movie;
