import React, { Component } from "react";
import {
  Card,
  CardHeader,
  CardMedia,
  CardTitle,
  CardText,
} from "material-ui/Card";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { getArticles, searchMovies, getMovie } from "../../api/api";
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
      // articles: [],
      param: 1,
      movies: [],
      show: false
    };

    // Tableau de référence des images.
    this.refImages = [];
  }

  prev() {
    this.setState(prevState => ({
      param: prevState.param - 1
    }));
  }

  next() {
    this.setState(nextState => ({
      param: nextState.param + 1
    }));
  }

  async componentDidMount() {

  let movies = await searchMovies({
    terms: "matrix", 
    page: this.state.param 
  });

    const firstFullDataMovie =
      movies.length > 0 ? await getMovie(movies[0].imdb) : {};

    this.setState({
      // articles,
      param: this.state.param,
      movies,
      show: true
    });
  }

  // animate(i) {
  //   TweenMax.to(this.refImages[i], 2, { opacity: 0 });
  // }

  render() {
    const movies = this.state.movies;
    // const articles = this.state.articles;
    return (
      <div className="Home">
        <div className="Home-intro">
          <button onClick={() => this.prev()}>
            Prev
          </button>
          <button onClick={() => this.next()}>
            Next
          </button>
          <div className="container">
            <TransitionGroup className="todo-list">
              {movies.map((movies, i) => (
                <Fade key={movies.imdb}>
                  <div className="Card">
                    <Card>
                      <Link to={`/movies/${movies.imdb}`} className="Card-link">
                        <CardHeader
                          title= {movies.title}
                          subtitle= {movies.year}
                        />
                        <div ref={img => (this.refImages[i] = img)}>
                          <CardMedia
                            className="Card-media"
                            style={{ backgroundImage: `url(${movies.poster})` }}
                            overlay={<CardTitle title={movies.title} />}
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
