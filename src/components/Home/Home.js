import React, { Component } from "react";
import {
  Card,
  CardHeader,
  CardMedia,
  CardTitle,
  CardText
} from "material-ui/Card";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { getArticles, searchMovies, getMovie } from "../../api/api";
import { Link } from "react-router-dom";
import "./Home.css";

const Fade = ({ children, ...props }) => (
  <CSSTransition {...props} timeout={3000} classNames="fade">
    {children}
  </CSSTransition>
);

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      articles: [],
      movies: [],
      show: false
    };
  }

  async componentDidMount() {
    const articles = await getArticles();

    const movies = await searchMovies("matrix");
    console.log(movies);
    const firstFullDataMovie = await getMovie(movies[0].imdb);
    console.log(firstFullDataMovie);

    this.setState({
      articles,
      movies,
      show: true
    });
  }

  render() {
    const articles = this.state.articles;
    return (
      <div className="Home">
        <div className="Home-intro">
          <div className="container">
            <TransitionGroup className="todo-list">
              {articles.map(article => (
                <Fade key={article.id}>
                  <div className="Card">
                    <Card>
                      <Link to={`/article/${article.id}`} className="Card-link">
                        <CardHeader
                          title="Bob"
                          subtitle="Web dev"
                          avatar="https://cdn.drawception.com/images/avatars/569903-A55.jpg"
                        />
                        <CardMedia
                          className="Card-media"
                          style={{ backgroundImage: `url(${article.img})` }}
                          overlay={<CardTitle title={article.title} />}
                          overlayContentStyle={{ background: "transparent" }}
                          overlayStyle={{ color: "#fff" }}
                        />
                        <CardText>{article.excerpt}</CardText>
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
