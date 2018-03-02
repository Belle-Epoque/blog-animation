import React, { Component } from "react";
import {
  Card,
  CardHeader,
  CardMedia,
  CardTitle,
  CardText
} from "material-ui/Card";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { searchMovies, getMovie } from "../../api/api";
import { Link } from "react-router-dom";
import { TweenMax } from "gsap";
import Buttons from "../Button/Button";
import "./Home.css";
import { search } from "omdb";

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
      search: "Matrix",
      show: false
    };

    // Tableau de référence des images.
    this.refImages = [];
  }

  async componentDidMount() {
    // const movies = await searchMovies("star wars");
    let movies = await searchMovies({
      terms: this.state.search, // Required string
      // year: 1999, // optional number
      page: 1, // optional number (1 - 100)
      type: "movie" // optional string ("series" || "movie" || "episode")
    });
    console.log("DEBUG", movies);
    const firstFullDataMovie =
      movies.length > 0 ? await getMovie(movies[0].imdb) : {};
    console.log(firstFullDataMovie);
    
    this.setState({
      movies,
      show: true
    });
  }

  animate(i) {
    TweenMax.to(this.refImages[i], 2, { opacity: 0 });
  }

  async search(event) {

    let search_value = event.target.value;
    console.log(search_value);
    let movies = await searchMovies({
      terms: search_value,
      page: 1,
    });
    this.setState({
      movies
    });
  }

  render() {
    let movies = this.state.movies;
    return (
      <div className="Home">
        <div className="Home-intro">
          <input type="text" onChange={(event) => this.search(event)}/>
          <button>Search</button>
          <Buttons />
          <div className="container">
            <TransitionGroup className="todo-list">
              {movies.map((movie, i) => (
                <Fade key={movie.id}>
                  <div className="Card">
                    <Card>
                      <Link to={`/movie/${movie.imdb}`} className="Card-link">
                        <CardHeader
                          title={movie.title}
                          subtitle={movie.year.toString()}
                        />
                        <div ref={img => (this.refImages[i] = img)}>
                          <CardMedia
                            className="Card-media"
                            style={{ backgroundImage: `url(${movie.poster})` }}
                            overlay={<CardTitle title={movie.title} />}
                            overlayContentStyle={{ background: "transparent" }}
                            overlayStyle={{ color: "#fff" }}
                          />
                        </div>
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
