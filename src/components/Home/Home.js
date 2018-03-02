import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  CardMedia,
  CardTitle,
  CardText
} from "material-ui/Card";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { getArticles, searchMovies, getMovie } from "../../api/api";
import { Link } from "react-router-dom";
import { TweenMax } from "gsap";
import Search from "./../Search/Search";
import "./Home.css";
import { presets } from "react-motion";

const Fade = ({ children, ...props }) => (
  <CSSTransition {...props} timeout={3000} classNames="fade">
    {children}
  </CSSTransition>
);

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: []
    };
  }

  async componentDidMount() {
    //const movies = await searchMovies("matrix");
    const movies = await searchMovies({
      terms: "matrix", // Required string
      //year: 1999, // optional number
      page: 1 // optional number (1 - 100)
      //type: "movie" // optional string ("series" || "movie" || "episode")
    });
    console.log("DEBUG", movies);
    const firstFullDataMovie =
      movies.length > 0 ? await getMovie(movies[0].imdb) : {};
    console.log(firstFullDataMovie);

    this.setState({
      movies
    });
  }

  animate(i) {
    TweenMax.to(this.refImages[i], 2, { opacity: 0 });
  }

  onSearch = async () => {
    if (this.title) {
      const movies = await searchMovies(this.title.value);
      this.setState({
        movies: movies
      });
    }
  };

  showDetails() {
    console.log("ok");
  }

  render() {
    const movies = this.state.movies;
    console.log(movies);
    return (
      <Fragment>
        <Search
          onSearch={this.onSearch}
          inputRef={title => (this.title = title)}
        />

        <div className="Home">
          <TransitionGroup className="todo-list">
            {movies.map((movies, i) => (
              <Fade key={movies.imdb}>
                <div className="movie-list">
                  <div className="movie-list__image">
                    <img src={movies.poster} alt="" />
                  </div>
                  <div className="movie-list__content">
                    <h3>{movies.title}</h3>
                    <Link className="" to={`/details/${movies.imdb}`}>
                      details
                    </Link>
                  </div>
                </div>
              </Fade>
            ))}
          </TransitionGroup>
        </div>
      </Fragment>
    );
  }
}

export default Home;
