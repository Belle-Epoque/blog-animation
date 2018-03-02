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
import Search from "../SearchBar/SearchBar";
import Pagination from "../Pagination/Pagination";
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
      types : ["movie", "serie", "episode"],
      show: false
    };

    // Tableau de référence des images.
    this.refImages = [];
  }

  // handleChange(){
  //   const requete = this.filterLabel.valueLabel.value;
  //   return requete;
  // }

  async componentDidMount() {
    const articles = await getArticles();

    //const movies = await searchMovies("matrix");
    const movies = await searchMovies({
       terms: this.searchLabel.valueLabel.value !== "" ? this.searchLabel.valueLabel.value : "matrix", // Required string
      //year: 1999, // optional number
      page: 1, // optional number (1 - 100)
      type: "movie" // optional string ("series" || "movie" || "episode")
    });
    console.log("DEBUG", movies);
    const firstFullDataMovie =
      movies.length > 0 ? await getMovie(movies[0].imdb) : {};
      const firstTypeSerie =
        movies.length > 0 ? await getMovie(movies[0].imdb) : {};
    console.log(firstFullDataMovie);
    console.log(firstTypeSerie);

    this.setState({
      articles,
      movies,
      show: true
    });
  }


  animate(i) {
    TweenMax.to(this.refImages[i], 2, { opacity: 0 });
  }

  render() {
    //const articles = this.state.articles;
    const movies = this.state.movies;
    const types = this.state.types;

    return (
      <div className="Home">
        <div className="Home-intro">
          <div className="container">
            <Search
            ref={label => {
              this.searchLabel = label;
            }} updateSearch={() => this.componentDidMount()}
            />
            <div className="filterType">
              <label>Filtrer votre recherche :</label>
              <select
              className="selectFilter"
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
            <TransitionGroup className="todo-list">
              {movies.map((movie, i) => (
                <Fade key={movie.imdb}>
                  <div className="Card">
                    {/* <button onClick={() => this.animate(i)}>Click</button> */}
                    <Card>
                      <Link to={`/article/${movie.imdb}`} className="Card-link">
                        <CardHeader
                          title={movie.title}
                          // subtitle={movie.year}
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
                          
                        </CardText>
                      </Link>
                    </Card>
                  </div>
                </Fade>
              ))}
            </TransitionGroup>
          </div>
        </div>
        <Pagination />
      </div>
    );
  }
}

export default Home;