import React, { Component } from "react";
import {
  Card,
  CardHeader,
  CardMedia,
  CardTitle,
  CardText
} from "material-ui/Card";

import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
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
      articles: [],
      movies: [],
      show: false
    };

    // Tableau de référence des images.
    this.refImages = [];
  }

  async componentDidMount() {
    const articles = await getArticles();

    //const movies = await searchMovies("matrix");
    const movies = await searchMovies({
       terms: "Evil", // Required string
       year: "", // optional number
       page: 1, // optional number (1 - 100)
       type: "", // optional string ("series" || "movie" || "episode")
    });
    console.log("DEBUG", movies);
    const firstFullDataMovie =
      movies.length > 0 ? await getMovie(movies[0].imdb) : {};
    console.log(firstFullDataMovie);

    this.setState({
      articles,
      movies,
      show: true
    });
  }

  animate(i) {
    TweenMax.to(this.refImages[i], 2, { opacity: 0 });   
  }
    
  async getMoviesDetailled(movies){
      movies.map(async movie => await this.getMoviesDetailled(movies))
  }
    
  render() {
    const movies = this.state.movies;
    return (
      <div className="Home">
        <div className="Home-intro">
          <div className="container">
            <DropDownMenu value={this.state.value} onChange={this.handleChange}>
                  <MenuItem value={1} primaryText="Never" />
                  <MenuItem value={2} primaryText="Every Night" />
                  <MenuItem value={3} primaryText="Weeknights" />
                  <MenuItem value={4} primaryText="Weekends" />
                  <MenuItem value={5} primaryText="Weekly" />
            </DropDownMenu>
           <TransitionGroup className="todo-list">
              {movies.map((movie, i) => (
                <Fade key={movie.id}>
                  <div className="Card col-md-4">
                    <button onClick={() => this.animate(i)}>Click</button>
                    <Card style="min-height: 460px;">
                      <Link to={`/movie/${movie.id}`} className="Card-link">
                        <CardHeader
                          title="Bob"
                          subtitle="Web dev"
                          avatar="https://cdn.drawception.com/images/avatars/569903-A55.jpg"
                        />
                        <div ref={img => (this.refImages[i] = img)}>
                          <CardMedia
                            className="Card-media"
                            style={{ backgroundImage: `url(${movie.poster})` }}
                          />
                        </div>
                        <CardTitle className="movies-titre" title={movie.title} />
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