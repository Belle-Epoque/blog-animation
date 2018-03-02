import React, { Component } from 'react';
import { Card, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { searchMovies, getMovie } from '../../api/api';
import { Link } from 'react-router-dom';
import { TweenMax } from 'gsap';
import './Home.css';
import { log } from 'util';

const Fade = ({ children, ...props }) => (
	<CSSTransition {...props} timeout={3000} classNames="fade">
		{children}
	</CSSTransition>
);

class Home extends Component {
	constructor(props) {
		super(props);

		this.state = {
			movies: [],
			show: false,
		};

		// Tableau de référence des images.
		this.refImages = [];
	}

	async componentDidMount() {
		//const movies = await searchMovies("matrix");

		const movies = await searchMovies({
			terms: 'harry', // Required string
			page: 1, // optional number (1 - 100)
		});

		await this.setState({
			movies: movies,
		});

		window.addEventListener('scroll', this.handleScroll);
	}

	animate(i) {
		TweenMax.to(this.refImages[i], 2, { opacity: 0 });
	}

	async handleSearch(title = 'harry', year = 0, cat = null) {
		let movies = null;

		if (title || year || cat) {
			movies = await searchMovies({
				terms: title ? title : 'harry',
				year: year,
				cat: cat,
				page: this.state.page,
			});
		} else {
			movies = await searchMovies({
				terms: 'harry',
				page: this.state.page,
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
				movies: loadAll,
			});
		}
	}

	render() {
		const { movies } = this.state;

		return (
			<div className="Home">
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
				<select
					className="Home-catSearch"
					onChange={() => this.handleSearch(this.yearSearch.value, this.catSearch.value)}
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

				<div className="wrapper">
					<TransitionGroup className="movies">
						{movies.map((movie, i) => (
							<Fade key={movie.imdb}>
								<Link key={movie.imdb} to={`/movies/${movie.imdb}`} className="movies-link">
									<div ref={img => (this.refImages[i] = img)}>
										<div className="movies-card">
											<figure>
												<img className="movies-img" src={movie.poster} alt={movie.title} />
											</figure>
											<h1 className="movies-title">{movie.title}</h1>
										</div>
									</div>
								</Link>
							</Fade>
						))}
					</TransitionGroup>
				</div>
			</div>
		);
	}
}

export default Home;
