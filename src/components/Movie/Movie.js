import React, { Component, Fragment } from "react";
import { getMovie } from "../../api/api";
import BlackBoxMovie from "./BlackBoxMovie";

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
    const { movie : {poster, title, plot, type, countries}} = this.state;

    return (

      <Fragment>
          <div className="containerMajor">


        <div className="Movie-img" style={{ backgroundImage: `url(${poster})` }}>
          <BlackBoxMovie reverseDirection={false} />
          <BlackBoxMovie reverseDirection={true} />
          <BlackBoxMovie reverseDirection={false} />
          <BlackBoxMovie reverseDirection={true} />
        </div>
        
        <div className="informations">
          <div className="Movie-body">
            <h2 className="Movie-title">{title}</h2>
            <p>Country :<span>{countries}, Type :{type}</span></p>
            <p className="description">{plot}</p>
          </div>
        </div>
        </div>
      </Fragment>
    );
  }
}