import React, { Component } from "react";
import { searchMovies, getMovie } from "../../api/api";
import uniqid from 'uniqid';

import { GridList } from 'material-ui/GridList';

import MovieCard from '../MovieCard/MovieCard';
import FiltersSelect from '../FiltersSelect/FiltersSelect'

import "./Home.css";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: [],
      filter: null,
      currentPage: 1
    };
  }

  async componentDidMount() {
    const movies = await searchMovies({
      terms: "drive", 
      page: 1
    });

    this.setState({
      movies,
      currentPage: 1
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

  async filterMovies(event, key, value){
    let itemType = value === 'series' ? 'series' : 'movie';

    const search = await searchMovies({
      terms: "drive", 
      type: itemType,
      page: 1
    });

    this.setState({
      movies: search,
      filter: value
    })
  }

  // async handleScroll(){
  //   const dctHeight = document.body.clientHeight;
  //   const { movies, currentPage } = this.state;
  //   let scrollPosition = window.scrollY;
    
  //   if (window.scrollY < dctHeight - (window.innerHeight + 100)){ return }

  //   const nextItems = await searchMovies({
  //     terms: "drive", 
  //     page: currentPage + 1
  //   });
  
  //   this.setState({
  //     movies: [...this.state.movies, nextItems],
  //     currentPage: currentPage + 1
  //   })
    
  //   console.log('scroll', window.scrollY);
  // }

  render() {
    const movies = this.state.movies;

    return (
      <div className="Home">
        <div className="container">
          <FiltersSelect  
            onFilterChange={(event, key, value) => this.filterMovies(event, key, value)}
          />
          <GridList 
            cellHeight="auto"
            padding={20}
            >
              {movies.map((movie, i) => (
                  <MovieCard 
                    key={uniqid()} 
                    movie={movie} 
                    movieId={i}
                    fullInfos={(movieId) => this.getMovieInfos(movieId)}/>
                )
              )}
          </GridList>
        </div>
      </div>
    );
  }
}

export default Home;
