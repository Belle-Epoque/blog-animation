import React, { Component, Fragment } from 'react';
import { Link } from "react-router-dom";
import {
    Card,
    CardHeader,
    CardMedia,
    CardText
  } from "material-ui/Card";

import './MovieCard.css';

class MovieCard extends Component {
    constructor(props){
        super(props);

        this.state = {
          movieInfos: null
        } 
        // On initialise notre référence pour la récupérer
        this.movieImg = null;
    }

    componentDidMount(){
      const { movieId, fullInfos } = this.props;

      fullInfos(movieId).then(result => {
        this.setState({
          movieInfos: result
        })
      });
    }

    render(){
        const { movie, movieId } = this.props;
        const movieInfos = this.state.movieInfos;

        return(
            <div className="Card MovieCard">
            <Card>
              <Link to={`/movie/${movieId}`} className="Card-link">
                <div ref={img => (this.movieImg = img)}>
                  <CardMedia
                    className="Card-media"
                    style={{ backgroundImage: `url(${movie.poster})` }}
                    overlayStyle={{ color: "#fff" }}
                  />
                </div>
                <CardHeader
                  title={`${movie.title}`}
                  subtitle={(typeof(movie.year) === 'number') ? `${movie.year}` : ''}
                />
                <CardText>
                  <p className="MovieAuthor">Réalisé par {(movieInfos) ? movieInfos.director : ''}</p>
                  <p className="MovieActors">Avec {(movieInfos) ? movieInfos.actors.join(', ') : ''}</p>
                </CardText>
              </Link>
            </Card>
          </div>
        )
    }
}

export default MovieCard;