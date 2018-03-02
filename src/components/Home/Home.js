import React, {Component} from "react";
import TextField from 'material-ui/TextField';
import {
    Card,
    CardHeader,
    CardMedia,
    CardTitle,
    CardText,
} from "material-ui/Card";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import {getArticles, searchMovies, getMovie} from "../../api/api";
import {Link} from "react-router-dom";
import {TweenMax} from "gsap";
import "./Home.css";

const Fade = ({children, ...props}) => (
    <CSSTransition {...props} timeout={3000} classNames="fade">
        {children}
    </CSSTransition>
);

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            movies: [],
            searchName: 'music'
        };

        // Tableau de référence des images.
        this.refImages = [];
    }

    handleChange = (event) => {
        this.setState({
            searchName: event.target.value,
        });
    };

    async getMovieDetailled(movie) {
        const movieDetailled = await getMovie(movie.imdb);
        return {
            ...movie,
            ...movieDetailled
        };
    }

    async getMoviesDetailled(movies) {
        return await Promise.all(
            movies.map(async movie => await this.getMovieDetailled(movie))
        );
    }

    async componentDidMount() {

        const articles = await getArticles();

        const movies = await searchMovies({
            terms: this.state.searchName,
            page: 1
        });
        console.log("DEBUG", movies);
        const firstFullDataMovie = movies.length > 0 ? await getMovie(movies[0].imdb) : {};
        console.log(firstFullDataMovie);

        const moviesDetailled = await this.getMoviesDetailled(movies);
        console.log(moviesDetailled);

        this.setState({
            articles,
            movies,
            show: true
        });
    }
    render() {

        const movies = this.state.movies;

        return (
            <div className="Home">
                {this.state.searchName}
                <TextField
                    className="searchbar"
                    value={this.state.searchName}
                    onChange={this.handleChange}
                />
                <div className="Home-intro">
                    <div className="container">
                        <div>
                            <ul>
                                <button></button>
                            </ul>
                        </div>
                        <TransitionGroup className="todo-list">
                            {movies.map((movie, i) => (
                                <Fade key={movie.imdb}>
                                    <div className="Card">
                                        <Card>
                                            <Link to={`/movie/${movie.imdb}`} className="Card-link">
                                                <div ref={img => (this.refImages[i] = img)}>
                                                    <div className="cardInfos">
                                                        <p>
                                                            <div>{movie.title}</div>
                                                            <div>{movie.year.toString()}</div>
                                                        </p>
                                                    </div>
                                                    <CardMedia
                                                        className="Card-media"
                                                        style={{backgroundImage: `url(${movie.poster})`}}
                                                        overlayContentStyle={{background: "transparent"}}
                                                        overlayStyle={{color: "#fff"}}
                                                    />
                                                </div>
                                                <CardText>{movie.excerpt}</CardText>
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
