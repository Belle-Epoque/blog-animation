import React, { Component } from "react";
import { getArticle } from "../../api/api";

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
      <div>
        <h1>{title}</h1>
        <p>{body}</p>
        <img src={img} />
        <br />
      </div>
    );
  }
}

export default Article;
