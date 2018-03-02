import React, { Component, Fragment } from "react";
import { getMovie } from "../../api/api";
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
      // Fix bug: force to refresh movie state when movie id change.
      this.refreshSingleArticle(nextProps.match.params.number);
    }
  }

  async refreshSingleArticle(movieId) {
    const filterArticle = await getMovie(movieId);

    if (!filterArticle) {
      // This movie doesn't exist.
      console.log('this movie does not exist')
      return;
    }

    this.setState({
      movie: filterArticle
    });
  }

  render() {
    const { movie: { title, body, poster } } = this.state;
    //console.log (this.state.movie.title);

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
            <p>{body}</p>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Article;
