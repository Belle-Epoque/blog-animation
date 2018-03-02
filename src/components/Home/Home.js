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

  render() {
    const articles = this.state.articles;
    const movies = this.state.movies;
    return (
      <div className="Home">
        <div className="Home-intro">
          <div className="container">
            <TransitionGroup className="todo-list">
              {movies.map((movies, i) => (
                <Fade key={movies.id}>
                  <div className="Card">
                    {/* <button onClick={() => this.animate(i)}>Click</button> */}
                    <Card>
                      <Link to={`/movie/${movies.id}`} className="Card-link">
                        {/* <CardHeader
                          title="Marley"
                          subtitle="Rédacteur"
                          avatar="https://cdn.drawception.com/images/avatars/569903-A55.jpg"
                        /> */}
                        {/* <div ref={img => (this.refImages[i] = img)}> */}
                        <CardMedia
                          className="Card-media"
                          style={{ backgroundImage: `url(${movies.poster})` }}
                          overlay={<CardTitle title={movies.title} />}
                          overlayContentStyle={{ background: "transparent" }}
                          overlayStyle={{ color: "#fff" }}
                        />
                        {/* </div> */}
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
