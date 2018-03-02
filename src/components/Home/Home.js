import React, { Component } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { searchMovies, getMovie } from "../../api/api";
import { Link } from "react-router-dom";
import { TweenMax } from "gsap";
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
      page: 1,
    };

  }

  async componentDidMount() {
    let movies = await searchMovies({
      terms: "star",
      page: this.state.page
    });

    this.setState({
      movies: movies,
    });

    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    let _scrollTop    = document.documentElement.scrollTop,
        _scrollHeight = document.documentElement.scrollHeight,
        _wh           = window.innerHeight,
        event         = Math.ceil(_scrollTop + _wh) >= _scrollHeight;

    if (event) {
      this.nextPage();
    }
  }

  async handleContent(title = "star", year = null, type = null, search = true){
    let movies = null;

    if (search) {
      this.setState({
        page: 1
      })
    }

    if (title || year || type) {
      movies = await searchMovies({
        terms: title ? title :"star",
        year: year,
        type: type,
        page: this.state.page
      });
    } else {
      movies = await searchMovies({
        terms: "star",
        page: this.state.page
      });
    }

    if (movies) {
      let allmovies;

      if (this.state.page > 1) {
        allmovies = this.state.movies.concat(movies);
      } else {
        allmovies = movies;
      }

      this.setState({
        movies: allmovies,
      });
    }
  }

  nextPage = () => {
    this.setState({
      page: this.state.page + 1
    })

    this.handleContent(this.titleSearch.value, this.yearSearch.value, this.typeSearch.value, false);
  }

  render() {
    const {
      movies
    } = this.state;

    return (
      <div className="Home">
        <div className="Filter-container">
            <input
              placeholder={'Title'}
              className="Filter-title"
              type="text"
              ref={(title) => { this.titleSearch = title; }}
              onChange={() => this.handleContent(this.titleSearch.value, this.yearSearch.value, this.typeSearch.value) }/>
            <input
              placeholder={'Year'}
              className="Filter-year"
              type="number"
              ref={(year) => { this.yearSearch = year; }}
              onChange={() => this.handleContent(this.titleSearch.value, this.yearSearch.value, this.typeSearch.value) }/>
            <select
              className="Filter-type"
              required="false"
              name="filter_type"
              ref={(type) => { this.typeSearch = type; }}
              onChange={() => this.handleContent(this.titleSearch.value, this.yearSearch.value, this.typeSearch.value) }>
              <option value="" defaultValue="selected"> - Any - </option>
              <option value="series">Serie</option>
              <option value="movie">Film</option>
            </select>
        </div>
          <TransitionGroup className="container">
          {movies.map((movie, i) => (
            <Fade key={movie.imdb}>
            <Link to={`/media/${movie.imdb}`} className="Media-link">
              <div className="Media">
                <div style={{ backgroundImage: `url(${movie.poster})` }} className="Media-image"></div>
                <div className="Media-text">
                  <h2 className="Media-title">
                    {movie.title}
                  </h2>
                  <span className="Media-year">
                    { (movie.year && (movie.year.from || movie.year.to)) ? `${movie.year.from} - ${movie.year.to}`: movie.year }
                  </span>
                  <span className="Media-type">
                    {movie.type}
                  </span>
                </div>
              </div>
            </Link>
          </Fade>
          ))}
        </TransitionGroup>
      </div>
    );
  }
}

export default Home;
