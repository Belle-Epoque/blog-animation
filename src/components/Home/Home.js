import React, {Component} from "react";
import {
    Card,
    CardHeader,
    CardMedia,
    CardTitle,
    CardText
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
            movies: []
        };

        // Tableau de référence des images.
        this.refImages = [];
    }

    async componentDidMount() {

        const articles = await getArticles();

        const movies = await searchMovies({
            terms: "The godfather", // Required string
            //year: 1999, // optional number
            page: 1 // optional number (1 - 100)
            //type: "movie" // optional string ("series" || "movie" || "episode")
        });
        console.log("DEBUG", movies);
        const firstFullDataMovie =
            movies.length > 0 ? await getMovie(movies[0].imdb) : {};
        console.log(firstFullDataMovie);


        const moviesDetails = await movies.map(async (movie) => (
            await getMovie(movie.imdb)
        ));
        console.log(moviesDetails);

        this.setState({
            articles,
            movies,
            show: true
        });
    }

    render() {
        const articles = this.state.articles;
        const movies = this.state.movies;

        return (
            <div className="Home">
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
                                                        <p>{movie.title}</p>
                                                        <p>{movie.year.toString()}</p>
                                                    </div>
                                                    <CardMedia
                                                        className="Card-media"
                                                        style={{backgroundImage: `url(${movie.poster})`}}
                                                        overlay={<CardTitle title={movie.title}/>}
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
