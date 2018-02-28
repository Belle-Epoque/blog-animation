import React, { Component } from "react";
import { getArticles } from "../../api/api";

class Article extends Component {
  constructor(props) {
    super(props);
    this.state = {
      article: {}
    };
  }

  componentDidMount() {
    this.refreshSingleArticle();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.number !== this.props.match.params.number) {
      // Fix bug: force to refresh article state when article id change.
      this.refreshSingleArticle();
    }
  }

  async refreshSingleArticle() {
    const articles = await getArticles();
    const filterArticle = articles.filter(article => {
      return article.id === this.props.match.params.number;
    });

    this.setState({
      article: filterArticle[0]
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
