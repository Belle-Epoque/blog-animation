import React, { Component } from "react";
import { getArticles } from "../../api/api";

class Article extends Component {
	constructor(props) {
		super(props);
		this.state = {
      article: {},
    };
	}

	async componentDidMount() {
    const articles = await getArticles();
    const filterAticle = articles.filter((article) => (article.id === this.props.match.params.number));

    this.setState({
      article: filterAticle[0]
    });
	}

	render() {
    const { article: { title, body, img } } = this.state;

    return(
      <div>
        <h1>{title}</h1>
        <p>{body}</p>
        <img src={img} /><br />
      </div>
    ); 
  }
}

export default Article;
