import React, { Component, Fragment } from "react";
import { getMovie } from "../../api/omdb";
import BlackBox from "./BlackBox.js";
import "./Article.css";

class Article extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: {}
    };
  }

  async componentDidMount() {
    const movieID = this.props.match.params.number;
    const movie = await getMovie(movieID);

    this.setState({movie});
  }

  formatData = (data) => {
    return data && data.reduce((acc, value, key) => key > 0 ? acc + `, ${value}` : acc + value);
  }

  render() {
    console.log(this.props);
    const {movie, movie: { title, poster, plot, actors, genres, type, year, director, productionCompany }} = this.state;
    return (
      <Fragment>
        <div className="container">
          <div className="Article-body">
            <h1 className="Article-title">{title}</h1>
            <img src={poster} alt="movie"/>
            <h3>{`${type}, ${this.formatData(genres)}, ${year}`}</h3>
            <h3>{`director: ${director}`}</h3>
            <h3>{`actors: ${this.formatData(actors)}...`}</h3>
            <p>{plot}</p>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Article;
