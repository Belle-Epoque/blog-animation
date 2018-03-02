import React, { Component, Fragment } from "react";
import { getMovie } from "../../api/api";
import BlackBox from "./BlackBox.js";
import { TweenMax } from "gsap";
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

    this.setState({
      article: filterArticle
    });
  }

  render() {
    const { article: { title, year, actors, plot, poster } } = this.state;
    return (
      <Fragment>
        <div
          className="Article-img"
          style={{ backgroundImage: `url(${poster})` }}
        >
          <BlackBox reverseDirection={false} />
          <BlackBox reverseDirection={true} />
          <BlackBox reverseDirection={false} />
          <BlackBox reverseDirection={true} />
        </div>
        <div className="container">
          <div className="Article-body">
            <h2 className="Article-title">
              {title}, {year}
            </h2>
            <h3 className="Article-actors">{actors}</h3>
            <p className="Article-description">{plot}</p>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Article;
