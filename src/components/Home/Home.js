import React, { Component } from "react";
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
import PropTypes from "prop-types";
import AdvancedSearch from "../Search/Search";
import Filter from "../Filter/Filter";
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
      articles: [],
      movies: [],
      types : ["movie", "series", "episode"],
      show: false
    };

    // Tableau de référence des images.
    this.refImages = [];
  }

  async componentDidMount() {
    const articles = await getArticles();
    const movies = await searchMovies({
       terms: this.searchLabel.valueLabel.value != "" ? this.searchLabel.valueLabel.value : "matrix", // Required string
       //year: 1999, // optional number
       page: 1, // optional number (1 - 100)
       type: this.typeLabel.value ? this.typeLabel.value : "movie"  // optional string
    });
    console.log("DEBUG", movies);
    const firstFullDataMovie =
      movies.length > 0 ? await getMovie(movies[0].imdb) : {};
      const firstTypeSerie =
        movies.length > 0 ? await getMovie(movies[0].imdb) : {};
    console.log(firstFullDataMovie);

    this.setState({
      articles,
      movies,
      show: true
    });
  }

  async filterMovieType(movies, i){
      const filterMovie = await getMovie(movies[i].type);
        this.setState({
            movie: filterMovie[0]
        });
  }

  animate(i) {
    TweenMax.to(this.refImages[i], 2, { opacity: 0 });
  }

  render() {
      // on met dans une constante l'état de la variable déclaré en state
    const articles = this.state.articles;
    const movies = this.state.movies;
    const types = this.state.types;

    return (
      <div className="Home">
        <div className="Home-intro">
            <div className="FilterWrapper">
                <p className="p">Choisissez : </p>
                <Filter
                    ref={label => {
                  this.typeLabel = label;
                }}
                onChange={() => this.componentDidMount()}/>
                <AdvancedSearch
                    ref={label => {
                        this.searchLabel = label;
                    }}
                    updateInput={() => this.componentDidMount()}
                />
            </div>
            <div className="container">
                <TransitionGroup className="todo-list">
                {movies.map((movie, i) => (
                    <Fade key={movie.imdb}>
                        <div className="Card">
                            <button onClick={() => this.animate(i)}>Click</button>
                            <Card>
                                <Link to={`/article/${movie.imdb}`} className="Card-link">
                                <CardHeader
                                    title={movie.title}
                                    subtitle={movie.year}
                                />
                                <div ref={poster => (this.refImages[i] = poster)}>
                                    <CardMedia
                                    className="Card-media"
                                    style={{
                                      backgroundImage: `url(${movie.poster})`
                                    }}
                            overlay={<CardTitle title={movie.title} />}
                            overlayContentStyle={{ background: "transparent" }}
                            overlayStyle={{ color: "#fff" }}
                          />
                        </div>
                        <CardText>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Maecenas vehicula, odio et vulputate tempor,
                          justo massa dignissim eros, sagittis tincidunt dolor
                          enim eget diam.
                        </CardText>
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

// permet de s'assurer qu'on recupère bien un booleen
 Home.propTypes = {
   terms: PropTypes.string.isRequired
 };

export default Home;
