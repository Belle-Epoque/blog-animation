import React, { Component } from "react";
import { searchMovies, getMovie } from "../../api/api";
import uniqid from 'uniqid';

import {GridList} from 'material-ui/GridList';
// import { CSSTransition, TransitionGroup } from "react-transition-group";
// import { TweenMax } from "gsap";

import MovieCard from '../MovieCard/MovieCard';

import "./Home.css";

// const Fade = ({ children, ...props }) => (
//   <CSSTransition {...props} timeout={3000} classNames="fade">
//     {children}
//   </CSSTransition>
// );

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: []
    };
  }

  async componentDidMount() {
    const movies = await searchMovies({
      terms: "drive", 
      page: 1
    });

    this.setState({
      movies
    });
  }

  // Récupère les données d'un film précis
  // pour afficher réalisateur et acteurs dans Homepage
  async getMovieInfos(movieId){
   const movies = this.state.movies;

   if (movies.length === 0){ return; }

   const movieInfos = await getMovie(movies[movieId].imdb);

   return movieInfos;
  };

  // animate(i) {
  //   TweenMax.to(this.refImages[i], 2, { opacity: 0 });
  // }

  render() {
    const movies = this.state.movies;
    
    return (
      <div className="Home">
        <div className="container">
          <GridList 
            cellHeight="auto"
            padding={20}
            >
            {/* <TransitionGroup className="todo-list"> */}
              {movies.map((movie, i) => (
                  // <Fade key={article.id}>
                  <MovieCard 
                    key={uniqid()} 
                    movie={movie} 
                    movieId={i}
                    fullInfos={(movieId) => this.getMovieInfos(movieId)}/>
                  // </Fade>
                )
              )}
            {/* </TransitionGroup> */}
          </GridList>
        </div>
      </div>
    );
  }
}

export default Home;
