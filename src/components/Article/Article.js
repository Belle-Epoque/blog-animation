import React, { Component, Fragment } from "react";
import { getMovie } from "../../api/omdb";
import BlackBox from "./BlackBox.js";
import "./Article.css";

class Article extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: {}
    };
  }

  componentDidMount() {
    this.refreshSingleArticle(this.props.match.params.number);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.number !== this.props.match.params.number) {
      // Fix bug: force to refresh article state when article id change.
      this.refreshSingleArticle(nextProps.match.params.number);
    }
  }

  async refreshSingleArticle(movieId) {
    const filterMovie = await getMovie(movieId);

    if (!filterMovie) {
      // This article doesn't exist.
      return;
    }

    this.setState({
      movie: filterMovie
    });
  }

  render() {
    const { movie } = this.state;

    return (
      <Fragment>
        <div className="Article-img" style={{ backgroundImage: `url(${movie.poster})` }}>
          <BlackBox reverseDirection={false} />
          <BlackBox reverseDirection={true} />
          <BlackBox reverseDirection={false} />
          <BlackBox reverseDirection={true} />
        </div>
        <div className="container">
          <div className="Article-body">
            <h1 className="Article-title">{movie.title}</h1>
            <h2>{movie.year}</h2>
            <h2>Director : {movie.director}</h2>
            <p className="Article-plot">{movie.plot}</p>
            <p>Rating : {movie.rated}</p>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Article;
