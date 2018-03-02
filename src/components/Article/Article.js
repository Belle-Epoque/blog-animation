import React, { Component, Fragment } from "react";
import BlackBox from "./BlackBox.js";
import { getMovie } from "../../api/omdb";
import { Card, CardHeader, CardTitle, CardText } from "material-ui/Card";

import "./Article.css";

class Article extends Component {
  constructor(props) {
    super(props);
    this.state = {
      article: {}
    };
  }

  componentDidMount() {
    this.refreshSingleArticle(this.props.match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.number !== this.props.match.params.number) {
      // Fix bug: force to refresh article state when article id change.
      this.refreshSingleArticle(nextProps.match.params.number);
    }
  }

  async refreshSingleArticle(articleId) {
    const filterArticle = await getMovie(articleId);
    this.setState({
      article: filterArticle
    });
  }

  render() {
    const { article: { title, poster, plot, director } } = this.state;
    return (
      <Fragment>
        <Card className="cards__article">
          <img src={poster} alt="" />
          <CardTitle title={title} subtitle={director} />
          <CardText>{plot}</CardText>
        </Card>
      </Fragment>
    );
  }
}

export default Article;
