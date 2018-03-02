import React, { Component } from "react";
import uniqid from "uniqid";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Search from "./../Search/Search";
import { searchMovies, getMovie } from "../../api/api";
import { MuiThemeProvider } from "material-ui";
import FlatButton from "material-ui/FlatButton";
import { Link } from "react-router-dom";

import "./Home.css";

const Fade = ({ children, ...props }) => (
  <CSSTransition {...props} timeout={3000} classNames="fade">
    {children}
  </CSSTransition>
);

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: [],
      show: false,
      value: "",
      page: 1
    };

    // Tableau de référence des images.
    this.refImages = [];
    this.refMedia = [];
  }

  async componentDidMount() {
    //const movies = await searchMovies("matrix");
    const movies = await searchMovies({
      terms: "matrix", // Required string
      //year: 1999, // optional number
      page: this.state.page // optional number (1 - 100)
      //type: "movie" // optional string ("series" || "movie" || "episode")
    });
    const firstFullDataMovie =
      movies.length > 0 ? await getMovie(movies[0].imdb) : {};
    console.log(firstFullDataMovie);

    this.setState({
      movies
    });
  }

  _handleSearch = ref => {
    (async () => {
      const movies = await searchMovies(ref);

      this.setState({
        movies: movies
      });
    })();
  };

  _handleNext() {
    let next = this.state.page + 1;
    this.setState({
      page: next
    });
    console.log(next);
  }

  _handlePrev() {
    let prev = this.state.page - 1;
    this.setState({
      page: prev
    });
    console.log(prev);
  }

  render() {
    const { movies, value } = this.state;
    return (
      <div>
        <Search onSearch={this._handleSearch} />
        <FlatButton label="Next" onClick={() => this._handleNext()} />
        <FlatButton label="Previous" onClick={() => this._handlePrev()} />
        <div className="home">
          {movies.map((items, i) => {
            return (
              <a key={uniqid()} href={`/article/${items.imdb}`}>
                <div className="home__cards">
                  <div className="home__medias">
                    <img
                      ref={media => (this.refMedia[i] = media)}
                      src={items.poster}
                    />
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Home;
