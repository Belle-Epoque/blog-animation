import React, { Component, Fragment } from "react";
import { getArticle } from "../../api/api";
import BlackBox from "./BlackBox.js";
import "./Article.css";

class Article extends Component {
  constructor(props) {
    super(props);
    this.state = {
      article: {},
      id: ''
    };
  }

  componentDidMount() {
    console.log('1')
    this.refreshSingleArticle(this.props.match.params.number);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.number !== this.props.match.params.number) {
      // Fix bug: force to refresh article state when article id change.
      this.refreshSingleArticle(nextProps.match.params.number);
    }
  }

  async refreshSingleArticle(articleId) {
    console.log('2')
    const filterArticle = await getArticle(articleId);
    console.log('3')

    if (!filterArticle) {
      // This article doesn't exist.
      return;
    }
    console.log('4')
    this.setState({
      article: filterArticle,
      id: articleId
    });
    console.log(this.state.id);
  }

  render() {
    const { article: { title, body, img } } = this.state;

    console.log("article", this.state.article);
    return (
      <Fragment>
        Article
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
