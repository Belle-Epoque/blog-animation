import React, { Component } from "react";
import { searchMovies, getMovie } from "../../api/api";
import Paper from 'material-ui/Paper';
import "./SingleMovie.css";

class SingleMovie extends Component {
  constructor(props) {
    super(props);
    
    // Deux clés respectivement pour les infos du film + l'affiche
    this.state = {
      singleMovie: {},
      poster: null
    };
  }

  async componentDidMount() {
    const movies = await searchMovies({
      terms: "drive", 
      page: 1
    });

    if (movies.length === 0) { return; }

    this.setState({
      singleMovie: await getMovie(movies[this.props.match.params.number].imdb),
      poster: movies[this.props.match.params.number].poster
    })
  }

  render() {
    const { singleMovie, poster } = this.state;

    return (
        <Paper zDepth={3} className="SingleMovie">
          <div className="SingleMovie-Head">
            <img src={poster} alt="" className="SingleMovie-HeadCover"/>
            <div className="SingleMovie-HeadDetails">
              <h3 className="Movie-Title">{singleMovie.title} ({singleMovie.year})</h3>
              <p>{singleMovie.genres}</p>
              <p>{singleMovie.runtime} - Classé {singleMovie.rated}</p>
              <p><span className="Movie-Label">Réalisé par</span> {singleMovie.director}</p>
              <p><span className="Movie-Label">Avec</span> {singleMovie.actors}</p>
              <p className="Movie-Score">Score RottenTomatoes <span>{singleMovie.metacritic}/100</span></p>
            </div>
          </div>

          <div className="SingleMovie-Plot">
            <p className="Movie-Label">Résumé</p>
            <p>{ singleMovie.plot }</p>
          </div>
      </Paper>

    );
  }
}

export default SingleMovie;
