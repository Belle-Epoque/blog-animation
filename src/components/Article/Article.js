import React, { Component, Fragment } from "react";
import { searchMovies, getMovie } from "../../api/api";
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
  }

  render() {
    const { movie: { title, poster } } = this.state;

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
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Article;
