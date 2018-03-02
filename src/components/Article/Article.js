import React, { Component, Fragment } from "react";
import { getArticle } from "../../api/api";
import { getMovie } from "../../api/api";
import BlackBox from "./BlackBox.js";
import { TweenMax } from "gsap";
import "./Article.css";

class Article extends Component {
  constructor(props) {
    super(props);
    this.state = {
      article: {},
      movie: {
          awards: []
      }
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

  async refreshSingleArticle(movieImdb) {
    const filterMovie = await getMovie(movieImdb);
    console.log(filterMovie)

    if (!filterMovie) {
      // This article doesn't exist.
      return;
    }

    this.setState({
      movie: filterMovie
    });
  }

  animate() {
    TweenMax.to(this.refTitle, 2, { color: 'red' });
  }

  render() {
    const { movie: { title, poster, actors, plot, awards } } = this.state;

    return (
      <Fragment>
        <div className="container">
          <div className="Article-body">
              <div className="containImg" style={{ backgroundImage: `url(${poster})` }}>
                  <BlackBox reverseDirection={false} />
                  <BlackBox reverseDirection={true} />
                  <BlackBox reverseDirection={false} />
                  <BlackBox reverseDirection={true} />
              </div>
             <div className="containInfo">
                 <button onClick={() => this.animate()}>Mon film</button>
                <h1 className="Article-title"
                    ref={label => {this.refTitle = label}}>{title}</h1>
                <p className="pArticle">With: <span className="span">{actors}</span></p>
                <p className="pArticle pArticleAwards">{awards.text}</p>
                <p className="pArticleLeft"><strong>Résumé:</strong> {plot}</p>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Article;
