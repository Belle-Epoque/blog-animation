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

    // Tableau de référence des images.
    this.refImages = [];
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
      movies,
      show: true
    });
  }

  animate(i) {
    TweenMax.to(this.refImages[i], 2, { opacity: 0 });
  }

  async type(movies) {
    let value = this.textSelect.value;

    if (value === 'all') {
      const filterType = await searchMovies({
        terms: "matrix", // Required string
        page: 1 // optional number (1 - 100)
      });
      this.setState({
        movies: filterType
      })
    } else {
      const filterType = await searchMovies({
        terms: "matrix", // Required string
        type: value,
        //year: 1999, // optional number
        page: 1 // optional number (1 - 100)
        //type: "movie" // optional string ("series" || "movie" || "episode"),
      });

      this.setState({
        movies: filterType
      })
    }
  }

  render() {
    const movies = this.state.movies;
    console.log(movies);

    return (
      <div className="Home">
        <div className="Home-intro">
          <div className="container">

        {/*SELECT BY TYPE*/}
            <select onChange={() => this.type(movies) } ref={(select) => { this.textSelect = select; }}>
              <option>all</option>
              <option>series</option>
              <option>movie</option>
              <option>episode</option>
            </select>

          {/*SEARCH*/}
            <input placeholder="Nom du film" />
            <button>Search </button>

          {/*AFFICHAGE*/}
            <TransitionGroup className="todo-list">
              {movies.map((movie, i) => (
                <Fade key={movie.imdb}>
                  <div className="Card">
                    <button onClick={() => this.animate(i)}>Click</button>
                    <Card>
                      <Link to={`/movie/${movie.imdb}`} className="Card-link">
                        <CardHeader
                          title={movie.title}
                        />
                        <h1>{movie.title}</h1>
                        <div ref={img => (this.refImages[i] = img)}>
                          <CardMedia
                            className="Card-media"
                            style={{ backgroundImage: `url(${movie.poster})` }}
                            overlay={<CardTitle title={movie.title} />}
                            overlayContentStyle={{ background: "transparent" }}
                            overlayStyle={{ color: "#fff" }}
                          />
                        </div>
                        <CardText>{movie.excerpt}</CardText>
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
