import React, { Component, Fragment } from "react";
import { getMovie } from "../../api/api";
import BlackBox from "./BlackBox.js";
import "./Article.css";
import {presets} from 'react-motion'

class Article extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: {}
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
      movie: filterArticle,
    });
  }

  render() {
    const { movie: { title, year, poster, actors, plot, countries, genres } } = this.state;
    return (
      <Fragment>
        <div className="Container-global">
            <BlackBox reverseDirection={false} />
            <BlackBox reverseDirection={true} />
            <BlackBox reverseDirection={false} />
            <BlackBox reverseDirection={true} />
            <img src={poster} alt="" />
          <div className="container-bottom">
            <div className="Article-body">
              <h1 className="Article-title">{title}</h1>
              <h2>{year} ({`${countries}`})</h2>
              <br/>
              <p>{`${actors}`}</p>
              <br/>
              <p>{`${genres}`}</p>
              <br/>
              <p>{plot}</p>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Article;
