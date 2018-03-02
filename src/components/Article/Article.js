import React, { Component, Fragment } from "react";
import { getArticles, searchMovies, getMovie } from "../../api/api";
import BlackBox from "./BlackBox.js";
import "./Article.css";

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
      // Fix bug: force to refresh article state when article id change.
      this.refreshSingleMovie(nextProps.match.params.number);
    }
  }

  async refreshSingleMovie(articleId) {
    const filterMovie = await getMovie(articleId);

    if (!filterMovie) {
      // This article doesn't exist.
      return;
    }

    this.setState({
      article: filterMovie
    });
  }

  render() {
    const { movie: { title, body, poster } } = this.state;

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
            <h1 className="Article-title">tttt{title}</h1>
            <p>{body}</p>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Movie;
