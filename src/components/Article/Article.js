import React, { Component, Fragment } from "react";
import { getMovie } from "../../api/api";
import BlackBox from "./BlackBox.js";
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

    // if (!filterArticle) {
    if (!filterMovie) {
      // This article doesn't exist.
      return;
    }

    this.setState({
      movie: filterMovie
    });
  }

  render() {
    const { movie: { title, poster, actors, plot, awards } } = this.state;

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
            <p className="Article-acteurs"><b>Acteurs :</b><br />{ actors}</p><br />
            <p className="Article-award"><b>Récompenses :</b><br />{awards.text}</p><br />
            <p className="Article-resum"><b>Synopsis :</b><br />{plot}</p>
            <img src={poster} className="Article-img2"/><br />
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Article;