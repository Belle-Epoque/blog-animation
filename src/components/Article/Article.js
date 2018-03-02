import React, { Component, Fragment } from "react";
import {searchMovies, getMovie  } from "../../api/api";
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

  async refreshSingleArticle(articleId) {
    const filterArticle = await getMovie(articleId);

    console.log(filterArticle);

    if (!filterArticle) {
      // This article doesn't exist.
      return;
    }

    this.setState({
      movie: filterArticle
    });
  }

  render() {
    const { movie: { title, poster, type, website, director } } = this.state;

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
            <p>Type : {type}</p>
            <p>Director : {director}</p>
            <a href={website}>Site du film</a>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Article;
