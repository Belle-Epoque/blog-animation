import React, { Component } from "react";
import {
  Card,
  CardHeader,
  CardMedia,
  CardTitle,
} from "material-ui/Card";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { searchMovies } from "../../api/api";
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
      show: false
    };

    this.refImages = [];
  }

  async componentDidMount() {

    const movies = await searchMovies({
      terms: "dog",
      page: 1 
    
    });

    this.setState({
      movies,
      show: true
    });
  }

  async filterSearch(title = "dog", year = null, type = null){
    let movies = null;
    if (title || year || type) {
      movies = await searchMovies({
        terms: title ? title :"dog",
        year: year,
        type: type,
        page: 1
      });
    } else {
      movies = await searchMovies({
        terms: "dog",
        page: 1
      });
    }

    if (movies) {
      this.setState({
        movies: movies,
      });
    }
  }

  render() {
    const movies = this.state.movies;
    return (
      <div className="Home">
        <div className="Home-intro">
          <div className="searchHome">
              <Link to={`/search`}>Recherchez votre film</Link>
          </div>
          <div className="aside-filter">
            <h3>Filtrer</h3>
            <input
            placeholder={'Titre'}
            className="Filter-title"
            type="text"
            ref={(title) => { this.titleSearch = title; }}
            onChange={() => this.filterSearch(this.titleSearch.value, this.yearSearch.value, this.typeSearch.value) }/>
            <input
            placeholder={'Année'}
            className="Filter-year"
            type="number"
            ref={(year) => { this.yearSearch = year; }}
            onChange={() => this.filterSearch(this.titleSearch.value, this.yearSearch.value, this.typeSearch.value) }/>
            <select
            className="Filter-type"
            required="false"
            name="filter_type"
            ref={(type) => { this.typeSearch = type; }}
            onChange={() => this.filterSearch(this.titleSearch.value, this.yearSearch.value, this.typeSearch.value) }>
                <option value="" defaultValue="selected"> Tout </option>
                <option value="series">Séries</option>
                <option value="movie">Films</option>
            </select>
          </div>
          <div className="container">
            <TransitionGroup className="fade">         
              {movies.map((movies, i) => (
                <Fade key={movies.imdb}>
                  <div className="Card">
                    <Card>
                      <Link to={`/movies/${movies.imdb}`} className="Card-link">
                        <CardHeader
                          className="Card-header" title={movies.type}
                        />
                          <CardMedia
                            className="Card-media"
                            style={{ backgroundImage: `url(${movies.poster})` }}
                            overlay={<CardTitle title={movies.title} className="Card-title" />}
                            overlayContentStyle={{ background: "transparent" }}
                            overlayStyle={{ color: "#fff" }}
                          />
                      </Link>
                    </Card>
                  </div>
                </Fade>
              ))}
            </TransitionGroup>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
