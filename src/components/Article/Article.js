import React, { Component, Fragment } from "react";
import Transition from "react-transition-group/Transition";
import { getArticles } from "../../api/api";
import "./Article.css";

class Article extends Component {
  constructor(props) {
    super(props);
    this.state = {
      article: {},
      in: false
    };
  }

  toggleEnterState = () => {
    this.setState({ in: true });
  };

  async componentDidMount() {
    const articles = await getArticles();
    const filterAticle = articles.filter(
      article => article.id === this.props.match.params.number
    );

    this.setState({
      article: filterAticle[0]
    });
  }

  render() {
    const { article: { title, body, img } } = this.state;

    return (
      <Fragment>
        <Transition timeout={150} in={true}>
          {status => (
            <div
              className="Article-img"
              style={{ backgroundImage: `url(${img})` }}
            />
          )}
        </Transition>
        <div class="container">
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
