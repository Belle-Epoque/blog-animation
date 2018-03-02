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
    this.refreshSingleMovie(this.props.match.params.imdb);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.imdb !== this.props.match.params.imdb) {
      // Fix bug: force to refresh movie state when movie id change.
      this.refreshSingleMovie(nextProps.match.params.imdb);
    }
  }

  async refreshSingleMovie(imdb) {
    const filterMovie = await getMovie(imdb);

    if (!filterMovie) {
      // This movie doesn't exist.
      return;
    }

    this.setState({
      movie: filterMovie
    });
  }

  render() {
    const { movie: { title, body, img } } = this.state;
    console.log(this.state.movie);

    return (
      <Fragment>
        <div className="Movie-img" style={{ backgroundImage: `url(${img})` }}>
          <BlackBox reverseDirection={false} />
          <BlackBox reverseDirection={true} />
          <BlackBox reverseDirection={false} />
          <BlackBox reverseDirection={true} />
        </div>
        <div className="container">
          <div className="Movie-body">
            <h1 className="Movie-title">{title}</h1>
            <img/ >
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Movie;
