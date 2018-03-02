import React, { Component, Fragment } from "react";
import { searchMovies, getMovie } from "../../api/api";
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
      this.refreshSingleMovie(nextProps.match.params.number);
    }
  }

  async refreshSingleMovie(movieId) {
    const filterMovie = await getMovie(movieId);

    if (!filterMovie) {
      return;
    }

    this.setState({
      movie: filterMovie
    });

    console.log(this.state.movie);
  }

  render() {
    const { movie: { title, poster, actors, director, genres } } = this.state;

    console.log(genres);


    return (
      <Fragment>
        <div className="Article-img" style={{ backgroundImage: `url(${poster})` }}>
          <BlackBox reverseDirection={false} />
          <BlackBox reverseDirection={true} />
          <BlackBox reverseDirection={false} />
          <BlackBox reverseDirection={true} />
        </div>
        <div className="container">
          <div className="Article-body">
            <h1 className="Article-title">{title}</h1>
            <p><strong>Direction :</strong> {director}</p>
            <p><strong>Genres :</strong> 
  
            </p>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Movie;
