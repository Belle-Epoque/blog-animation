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
import "./Home.css";
import AutoComplete from 'material-ui/AutoComplete';

const Fade = ({ children, ...props }) => (
  <CSSTransition {...props} timeout={3000} classNames="fade">
    {children}
  </CSSTransition>
);

const  titleSelection = [];

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      articles: [],
      movies: [],
      search : "matrix",
      show: false
    };

    // Tableau de référence des images.
    this.refImages = [];
  }

  async componentDidMount() {
    const articles = await getArticles();

    //const movies = await searchMovies("matrix");
    const movies = await searchMovies({
      terms: this.state.search, // Required string
      //year: 1999, // optional number
      page: 1 // optional number (1 - 100)
      //type: "movie" // optional string ("series" || "movie" || "episode")
    });
    console.log("DEBUG", movies);
    console.log(movies[0].title)

    for (let x in movies) {
      console.log(movies[x].title)
      titleSelection.push(movies[x].title)
    }
    console.log(titleSelection)
    const firstFullDataMovie =
      movies.length > 0 ? await getMovie(movies[0].imdb) : {};
    console.log(firstFullDataMovie);
    console.log(firstFullDataMovie.title);

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
    const articles = this.state.articles;
    const movies = this.state.movies;
    console.log(movies);

    return (
      <div className="Home">
        <div className="Home-intro">

          <form onSubmit={this.handleSubmit}>
            <label>
              Name:
              <input type="text" value={this.state.value} onChange={this.handleChange} />
            </label>
            <input type="submit" value="Submit" />
          </form>

          <AutoComplete
              floatingLabelText="Type 'peah', fuzzy search"
              filter={AutoComplete.fuzzyFilter}
              dataSource={titleSelection}
              maxSearchResults={5}
          />

          <div className="container">
            <TransitionGroup className="todo-list">
              {movies.map((movie, i) => (
                <Fade key={movie.imdb}>
                  <div className="Card">
                    <button onClick={() => this.animate(i)}>Click</button>
                    <Card>
                      <Link to={`/article/${movie.imdb}`} className="Card-link">
                        <CardHeader
                          title={`${movie.title}`}
                          subtitle={`${movie.year}`}
                          avatar={`${movie.poster}`}
                        />
                        <div ref={img => (this.refImages[i] = img)}>
                          <CardMedia
                            className="Card-media"
                            title="Contemplative Reptile"
                            style={{ backgroundImage: `url(${movie.poster})` }}
                            overlay={<CardTitle title={movie.title} />}
                            overlayContentStyle={{ background: "transparent" }}
                            overlayStyle={{ color: "#fff" }}
                          />
                        </div>
                        <CardText>{movies.excerpt}</CardText>
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
