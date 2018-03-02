import React, { Component, Fragment } from "react";
import { getMovie } from "../../api/api";
import BlackBox from "./BlackBox.js";
import "./Article.css";

class Article extends Component {
  constructor(props) {
    super(props);
    this.state = {
      article: {}
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

    const filterArticle = await getMovie(articleId);

    if (!filterArticle) {
      // This article doesn't exist.
      return;
    }

    console.log(filterArticle);

    this.setState({
      article: filterArticle
    });
  }

  render() {
    const { article: { title, plot, poster } } = this.state;

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
            <p>{plot}</p>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Article;
