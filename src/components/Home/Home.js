import React, { Component } from "react";
import {
  Card,
  CardMedia,
  CardTitle,
  CardText
} from "material-ui/Card";
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
      show: false,
      terms: "star wars",
      type: "movie"
    };

    // Tableau de référence des images.
    this.refImages = [];
    this.handleChange = this.handleChange.bind(this);
  }

  async componentDidMount() {
     this.state.movies = await searchMovies({
      terms: this.state.terms, // Required string
      page: 1, // optional number (1 - 100)
      type: this.state.type // optional string ("series" || "movie" || "episode")
    });
    console.log("DEBUG", this.state.movies);
    const firstFullDataMovie =
      this.state.movies.length > 0 ? await getMovie(this.state.movies[0].imdb) : {};
    console.log(firstFullDataMovie);

    this.setState({
      show: true
    });
  }

  async handleChange(event) {
    if (!event.target.value) {
        const result = await searchMovies({
            terms: this.state.terms,
            type: this.state.type
        });
        this.setState({movies: result});
    } else {
        const movieTerms = event.target.value;
        const result = await searchMovies({
            terms: event.target.value,
            type: this.state.type
        });
        this.setState({movies: result, terms: movieTerms});
    }
  }

  async handleFilter(event) {
      if (!event.target.value) {
          const moviesFilter = await searchMovies({
              terms: this.state.terms,
              type: this.state.type
          });
          this.setState({movies: moviesFilter});
      } else {
          const movieType = event.target.value;
          const moviesFilter = await searchMovies({
              terms: this.state.terms,
              type: event.target.value
          });
          this.setState({movies: moviesFilter, type: movieType});
      }
  }

  animate(i) {
    TweenMax.to(this.refImages[i], 2, { opacity: 0 });
  }

  render() {
    const movies = this.state.movies;

    return (
      <div className="Home">
        <div className="Home-intro">
          <div className="search-bar-block">
            <label htmlFor="search-bar">Find a movie, a tv show by name</label>
            <input type="text" id="search-bar" onChange={(e) => this.handleChange(e)}/>
          </div>
          <div className="select-movie-type">
            <label htmlFor="filter-type">Are you looking for a movie or a tv show ?</label>
            <select name="filterType" id="filter-type" value={this.state.type} onChange={(e) => this.handleFilter(e)}>
              <option value="movie">Movie</option>
              <option value="series">TV show</option>
              <option value="episode">Episode</option>
            </select>
          </div>
          <div className="container">
            <TransitionGroup className="todo-list">
              {movies.map((movie, i) => (
                <Fade key={movie.imdb}>
                  <div className="Card">
                    <Card style={{backgroundColor: "#000"}}>
                      <Link to={`/movie/${movie.imdb}`} className="Card-link">
                        <div ref={img => (this.refImages[i] = img)}>
                          <CardMedia
                            className="Card-media"
                            style={{ backgroundImage: `url(${movie.poster})` }}
                            overlay={<CardTitle title={movie.title} style={{background: "rgba(0, 0, 0, 0.8)"}} />}
                            overlayContentStyle={{ background: "transparent" }}
                            overlayStyle={{ color: "#fff" }}
                          />
                        </div>
                        <CardText>{movie.plot}</CardText>
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
