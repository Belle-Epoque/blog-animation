import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { getMovie } from "../../api/api";
import "./Movie.css";

class Movie extends Component {
 constructor(props) {
   super(props);
   this.state = {
     movies: {}
   };
 }

 componentDidMount() {
   this.refreshSingleMovie(this.props.match.params.number);
 }

 componentWillReceiveProps(nextProps) {
   if (nextProps.match.params.number !== this.props.match.params.number) {
     this.refreshSingleMovie(nextProps.match.params.number);
   }
 }

 async refreshSingleMovie(MovieId) {
   const filterMovie = await getMovie(MovieId);

   if (!filterMovie) {
     return;
   }

   this.setState({
     movies: filterMovie
   });
 }

 render() {
  
   const { movies: { title, poster, plot, year } } = this.state;
   

   return (
     <Fragment>
       <div className="container-movie">
        <div className="Movie-img" style={{ backgroundImage: `url(${poster})` }}>
        </div>
          <div className="Movie-body">
              <h1 className="Movie-title">{title}</h1>
              <p className="date">{year}</p>
              <p className="plot">{plot}</p>
        </div>
       </div>
     </Fragment>
   );
 }
}

export default Movie;