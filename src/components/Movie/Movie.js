import React, { Component, Fragment } from "react";
import { getMovie } from "../../api/api";
import BlackBoxMovie from "./BlackBoxMovie";
import "./Movie.css";

export default class Movie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: {}
    };
  }
async componentDidMount() {
    const movie = await getMovie(this.props.match.params.number);
    console.log(movie);
    this.setState({ movie })
  }
  render() {
    const { movie } = this.state;

    return (

      <Fragment>
          <div className="containerMajor">


        <div className="Movie-img" style={{ backgroundImage: `url(${movie.poster})` }}>
          <BlackBoxMovie reverseDirection={false} />
          <BlackBoxMovie reverseDirection={true} />
          <BlackBoxMovie reverseDirection={false} />
          <BlackBoxMovie reverseDirection={true} />
        </div>
        
        <div className="informations">
          <div className="Movie-body">
            <h1 className="Movie-title">{movie.title}</h1>
            <p>Country :<span>{movie.countries}, Type :{movie.type}</span></p>
            <p className="description">{movie.plot}</p>
          </div>
        </div>
        </div>
      </Fragment>
    );
  }
}


