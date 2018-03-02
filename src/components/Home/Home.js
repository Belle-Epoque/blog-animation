import React, {Component} from "react";
import {
    Card,
    CardHeader,
    CardMedia,
    CardTitle,
    CardText
} from "material-ui/Card";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import { searchMovies, getMovie} from "../../api/api";
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
            show: false
        };

        // Tableau de référence des images.
        this.refImages = [];
    }

    async componentDidMount() {
        //const articles = await getArticles();

        const movies = await searchMovies({
            terms: "matrix", // Required string
            //year: 1999, // optional number
            page: 1 // optional number (1 - 100)
            //type: "movie" // optional string ("series" || "movie" || "episode")
        });
        //console.log("DEBUG", movies);
        const firstFullDataMovie =
        movies.length > 0 ? await getMovie(movies[0].imdb) : {};
        //console.log(firstFullDataMovie);



        const filters = movies.filter( items =>  ( items.type === "movie" || items.type === "series") );
        console.log(filters);

        this.setState({
            //articles,
            movies,
            show: true
        });
    }


    animate(i) {
        TweenMax.to(this.refImages[i], 2, {opacity: 0});
    }


async handleSearch(title = 'Wallace', year = null, cat = null) {
        let movies = null;
        console.log(cat);

		if (title || year || cat) {
			movies = await searchMovies({
				terms: title ? title : 'Wallace',
				year: year,
				cat: cat,
				page: this.state.page
			});
		} else {
			movies = await searchMovies({
				terms: 'Wallace',
				page: this.state.page
			});
		}

		if (movies) {
			let loadAll;

			if (this.state.page > 1) {
				loadAll = this.state.movies.concat(movies);
			} else {
				loadAll = movies;
			}

			this.setState({
				movies: loadAll
			});
		}
	}

	render() {
		const { movies } = this.state;

		return (
			<div className="Home">

            <h1>Welcome on board !</h1>
				<div className="Search-Box">
                <div>
					<input
						className="Home-globalSearch"
						placeholder="Rechercher un film..."
						type="text"
						ref={title => {
							this.titleSearch = title;
						}}
						onChange={() =>
							this.handleSearch(this.titleSearch.value, this.yearSearch.value, this.catSearch.value)
						}
					/>
				</div>

                <input
					placeholder="2000"
					className="Home-yearSearch"
					type="number"
					ref={year => {
						this.yearSearch = year;
					}}
					onChange={() =>
						this.handleSearch(this.titleSearch.value, this.yearSearch.value, this.catSearch.value)
					}
				/>

                <select
					className="Home-catSearch"
					onChange={() => this.handleSearch(this.titleSearch.value, this.yearSearch.value, this.catSearch.value)}
					ref={cat => {
						this.catSearch = cat;
					}}
				>
					<option value="" defaultValue="selected">
						Catégorie
					</option>
					<option value="series">Serie</option>
					<option value="movie">Film</option>
				</select>
                </div>


                    <div className="container">
                        
                        <TransitionGroup className="todo-list">
                            {movies.map((movie, i) => (
                                <Fade key={movie.imdb}>
                                    <div className="Card">
                                        <div className="Card-ctn">
                                            <Link to={`/Movie/${movie.imdb}`} className="Card-link">
                                                {/* <div className="Card-Top"> */}

                                                    {/* <span>{ (typeof(movie.year) === "number") ? movie.year : '' }</span> */}
                                                   
                                                {/* </div> */}
                                                <div className="Ref-image">
                                                    <img src={movie.poster} alt=""/>
                                                </div>

                                            <p className="title">{movie.title}

                                            </p>
                                            </Link>
                                        </div>
                                    </div>
                                </Fade>
                            ))}
                        </TransitionGroup>
                    </div>
                </div>
    
        );
    }
}

export default Home;