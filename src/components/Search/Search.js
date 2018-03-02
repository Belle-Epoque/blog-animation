import React, { Component } from "react";
import {
  Card,
  CardHeader,
  CardMedia,
  CardTitle
} from "material-ui/Card";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { searchMovies} from "../../api/api";
import { Link } from "react-router-dom";
import "./Search.css";

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: [],
      show: false
    };
  }

  async searchPage(search){
    if (search) {
      const movies = await searchMovies({
        terms: search, 
        page: 1 
      });

      this.setState({
        movies: movies
      });
    }
  }

  render() {
    const {
      movies
    } = this.state;

    return (
      <div className="Search">
        <div>
            <h2>Recherchez votre film favori</h2>
            <input
              type="text" placeholder="Nom du film"
              ref={(input) => { this.textInput = input; }}
              onChange={e => this.searchPage(this.textInput.value) }/>
        </div>
        <div className="container">
            <TransitionGroup className="todo-list">
              {movies.map((movies, i) => (
                  <div className="Card">
                    <Card>
                      <Link to={`/movies/${movies.imdb}`} className="Card-link">
                        <CardHeader
                          className="Card-header" title={movies.type}
                        />
                          <CardMedia
                            className="Card-media"
                            style={{ backgroundImage: `url(${movies.poster})` }}
                            overlay={<CardTitle title={movies.title} className="Card-title" />}
                            overlayContentStyle={{ background: "transparent" }}
                            overlayStyle={{ color: "#fff" }}
                          />
                      </Link>
                    </Card>
                  </div>
              ))}
            </TransitionGroup>
          </div>
      </div>
    );
  }
}

export default Search;