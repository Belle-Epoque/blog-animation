import React, { Component, Fragment } from "react";
import {getMovie} from "../../api/api";
import BlackBoxMovie from "./BlackBoxMovie";
import "./Movie.css";

class Movie extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movie: {}
        };
    }

    async componentDidMount() {
        const movie = await getMovie(this.props.match.params.number);
        console.log(movie);
        this.setState({movie});
        // this.refreshSingleArticle(this.props.match.params.number);
    }

    render() {
        const { movie: {title, poster, plot, year} } = this.state;

        return (
            <Fragment>
                <div className="Article-img" style={{ backgroundImage: `url(${poster})` }}>
                    <BlackBoxMovie reverseDirection={false} />
                    <BlackBoxMovie reverseDirection={true} />
                    <BlackBoxMovie reverseDirection={false} />
                    <BlackBoxMovie reverseDirection={true} />
                </div>
                <div className="container">
                    <div className="Article-body">
                        <h1 className="Article-title">{title}</h1>
                        <p className="Article-Desc">{plot}</p>
                        <p className="Article-Year">{year}</p>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default Movie;
