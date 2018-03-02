import React, { Component, Fragment } from 'react';
import { getMovie } from '../../api/api';
import BlackBox from './BlackBox.js';
import './Article.css';

class Article extends Component {
	constructor(props) {
		super(props);
		this.state = {
			movies: {},
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
		const filterArticle = await getMovie(articleId);

		if (!filterArticle) {
			// This article doesn't exist.
			return;
		}

		this.setState({
			movies: filterArticle,
		});
	}

	render() {
		const { movies: { title, poster, plot, actors, director, type, year } } = this.state;

		return (
			<Fragment>
				<div className="Article-img" style={{ backgroundImage: `url(${poster})` }}>
					<div className="Article-wrapper">
						<div className="Article-info">
							<p>{actors}</p>
							<h1 className="Article-title">{title}</h1>
							<span>Catégorie: {type}</span>
							<span>Année: {year}</span>
							<h2 className="Article-director">By {director}</h2>
							<p>{plot}</p>
						</div>
					</div>
					<BlackBox reverseDirection={false} />
					<BlackBox reverseDirection={true} />
					<BlackBox reverseDirection={false} />
					<BlackBox reverseDirection={true} />
				</div>
				<div className="container">
					<div className="Article-body">
						<ul />
					</div>
				</div>
			</Fragment>
		);
	}
}

export default Article;
