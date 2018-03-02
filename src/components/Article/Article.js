import React, {Component, Fragment} from "react";
import {getArticle, getMovie} from "../../api/api";
import BlackBox from "./BlackBox.js";
import "./Article.css";

class Article extends Component {
    constructor(props) {
        super(props);
        this.state = {
            article: {},
            movie: {}
        };
    }

    componentDidMount() {
        this.refreshSingleArticle(this.props.match.params.number);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.match.params.number !== this.props.match.params.number) {
            // Fix bug: force to refresh article state when article id change.
            this.refreshSingleArticle(nextProps.match.params.number);
        }
    }

    async refreshSingleArticle(articleId) {
        console.log('articleId', articleId);
        const filterMovie = await getMovie(articleId);
        console.log('filterMovie', filterMovie);

        if (!filterMovie) {
            // This article doesn't exist.
            return;
        }

        this.setState({
            movie: filterMovie
        });
    }

    render() {
        const {movie: {title, plot, poster}} = this.state;
        const genres = this.state.movie.genres;
        if (!genres) return <div>Loading...</div>;

        return (
            <Fragment>
                <div className="container">
                    <div className="Article-body">
                        <h1 className="Article-title">{title}</h1>
                        <div>
                            <img src={poster} alt=""/>
                        </div>
                        <p>{plot}</p>
                        <ul>
                            {genres.map((genre) => (
                                <li>{genre}</li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="Article-img">
                    <BlackBox reverseDirection={false}/>
                    <BlackBox reverseDirection={true}/>
                    <BlackBox reverseDirection={false}/>
                    <BlackBox reverseDirection={true}/>
                </div>
            </Fragment>
        );
    }
}

export default Article;
