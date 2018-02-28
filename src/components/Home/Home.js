import React, { Component } from "react";
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import { CSSTransitionGroup } from 'react-transition-group';
import { getArticles } from "../../api/api";
import { Link } from "react-router-dom";
import "./Home.css";

class Home extends Component {
	constructor(props) {
		super(props);

		this.state = {
			articles: [],
			items: ['I\'m number 1', 'I\'m number 2', 'I\'m number 3'],
            itemNumber: 3
		};
	}
	async componentDidMount() {
		const articles = await getArticles();
		this.setState({
			articles
		});
  }

	render() {
    const articles = this.state.articles;

		return (  
			<div className="Home">
				<div className="Home-intro">
					<div className="container">
						<CSSTransitionGroup
							transitionName="fade"
							transitionEnterTimeout={300}
							transitionLeaveTimeout={300}
							transitionAppear={true}
							transitionAppearTimeout={1000}>
							{articles.map(article => (
								<Card key={article.id} className="Card">
									<Link to={`/article/${article.id}`} className="Card-link">
										<CardHeader
											title="Bob"
											subtitle="Web dev"
											avatar="https://cdn.drawception.com/images/avatars/569903-A55.jpg"
										/>
										<CardMedia className="Card-media" style={{backgroundImage: `url(${article.img})`}} overlay={<CardTitle title={article.title} />} overlayContentStyle={{background:'transparent'}} overlayStyle={{ color: '#fff'}}/>
										<CardText>
											{article.excerpt}
										</CardText>
									</Link>
								</Card>
							))}
						</CSSTransitionGroup>
					</div>
				</div>
			</div>
		);
	}
}

export default Home;
