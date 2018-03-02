import React, { Component, Fragment } from "react";
import {
  List,
  ListItem
} from "material-ui/Card";
import { getMovie, getArticle } from "../../api/api";
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

    this.setState({
      article: filterArticle
    });
  }

  render() {

    const  article = this.state.article;

    return (
      <Fragment>
        <div className="Article-img" style={{ backgroundImage: `url(${article.poster})` }}>
          <BlackBox reverseDirection={false} />
          <BlackBox reverseDirection={true} />
          <BlackBox reverseDirection={false} />
          <BlackBox reverseDirection={true} />
        </div>
        <div className="container">
          <div className="Article-body">
            <h1 className="Article-title">{article.title}</h1>
            <p>{article.plot}</p>
            <p>{article.actors}</p>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Article;


/*

<List>
  {article.actors.map((actor, i) => (
    console.log(actor)
  ))};
</List>
*/
