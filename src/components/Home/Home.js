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
import Input from "./Input";
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
      articles: [],
      movies: [],
      types: ["movie", "series", "episode"],
      show: false
    };

    // Tableau de référence des images.
    this.refImages = [];
  } 


    async componentDidMount() {
      const articles = await getArticles();
      console.log(this.filterLabel.value); 
      //const movies = await searchMovies("matrix");
      const movies = await searchMovies({
        terms:
          this.searchLabel.valueLabel.value != ""
            ? this.searchLabel.valueLabel.value
            : "matrix", // Required string
      //year: 1999, // optional number
      page: 1, // optional number (1 - 100)
      type: this.filterLabel.value ? this.filterLabel.value : "movie" // optional string ("series" || "movie" || "episode")
    });

    const firstFullDataMovie =
      movies.length > 0 ? await getMovie(movies[0].imdb) : {};

    this.setState({
      articles,
      movies,
      types: ["movie", "series", "episode"],
      show: true
    });
  }

  animate(i) {
    TweenMax.to(this.refImages[i], 2, { opacity: 0 });
  }

  render() {
    const articles = this.state.articles;
    const movies = this.state.movies;
    const types = this.state.types;

    return (
      <div className="Home">
        <div className="Home-intro">
          <div className="container">
            <div className="filter-by-type">
              <h3>Filtrer par type : </h3>
              <select
                className="select"
                name="form"
                ref={label => {
                  this.filterLabel = label;
                }}
                onChange={() => this.componentDidMount()}
              >
                {types.map((type, i) => (
                  <option value={types[i]}>{types[i]}</option>
                ))}
              </select>
            </div>
            <div className="search">
              <h3>Recherche avancée : </h3>
              <Input
                ref={label => {
                  this.searchLabel = label;
                }}
                updateInput={() => this.componentDidMount()}
              />
            </div>
            <TransitionGroup className="todo-list">
              {movies.map((movie, i) => (
                <Fade key={movie.id}>
                  <div className="Card">
                    {/* <button onClick={() => this.animate(i)}>Click</button> */}
                    <Card>
                      <Link to={`/article/${movie.imdb}`} className="Card-link">
                        <CardHeader
                          title={movie.title}
                          subtitle={movie.year}
                          // avatar="https://cdn.drawception.com/images/avatars/569903-A55.jpg"
                        />
                        <div ref={img => (this.refImages[i] = img)}>
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
                        {/* <CardText>{article.excerpt}</CardText> */}
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

export default Home;
