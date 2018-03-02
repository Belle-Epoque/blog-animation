import React, { Component, Fragment } from "react";
import BlackBox from "./BlackBox.js";
import { getArticle, searchMovies, getMovie } from "../../api/api";
import "./Article.css";

class Article extends Component {
  constructor(props) {
    super(props);
    this.state = {
      article: [],
      movies: []
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

  async refreshSingleArticle(articleId) {
    const filterArticle = await getArticle(articleId);

    if (!filterArticle) {
      // This article doesn't exist.
      return;
    }

    this.setState({
      article: filterArticle
    });
  }

  render() {
    const { article: { title, body, img } } = this.state;

    return (
      <Fragment>
        <div className="Article-img" style={{ backgroundImage: `url(${img})` }}>
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
