import React, { Component, Fragment } from "react";
import { getMovie } from "../../api/api";

import "./Page.css";

class Movies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: {}
    };
  }

  async componentDidMount() {
    const filterMovies = await getMovie(this.props.match.params.number);
    // this.refreshSingleMovies(this.props.match.params.number);
    console.log(filterMovies);
    this.setState({
      movies: filterMovies
    });
  }



  render() {
    const { movies } = this.state;
    console.log(movies);

    return (
      <Fragment>
        <div className="Article-img" style={{ backgroundImage: `url(${movies.poster})`  }}>
        </div>
        <div className="container">
          <div className="Article-body">
            <h1 className="Article-title">{movies.title}</h1>
            <p className="Article-plot">{movies.plot}</p>
            <p className="Article-actors">Directors : {movies.director}</p>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Movies;