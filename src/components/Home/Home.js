import React, { Component } from "react";
import {
  Card,
  CardHeader,
  CardMedia,
  CardTitle,
  CardText,
} from "material-ui/Card";
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import { CSSTransition, TransitionGroup } from "react-transition-group";
import { searchMovies, getMovie } from "../../api/api";
import { Link } from "react-router-dom";
import { TweenMax } from "gsap";

import Pagination from "./Pagination/Pagination";
import "./Home.css";

const Fade = ({ children, ...props }) => (
  <CSSTransition {...props} timeout={1000} classNames="fade">
    {children}
  </CSSTransition>
);

const style = {
  margin: 12,
};

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      articles: [],
      movies: [],
      filter: {},
      page: 1,
      search: "",
      current: "matrix",
      show: false
    };

    this.refImages = [];
    this.searchInput = null;
  }

  componentWillMount() {
    const filter = {
      "allFilters": [],
      "currentFilter": "",
      "elementsFiltered": [],
    }

    this.setState({ filter })
  }

  async componentDidMount() {
    const movies = await searchMovies({
      terms: this.state.current,
      page: this.state.page
    });

    let types = movies.map((element) => { return element.type; })
    types = types.filter((elem, pos) => { return types.indexOf(elem) == pos; });

    this.setState({
      movies,
      filter: {...this.state.filter, allFilters: types},
      show: true
    }); 
  }

  /**
   * FILTERS
   */

  filterType(e, filter) {
    e.preventDefault();

    if (filter === this.state.filter.currentFilter) {
      this.clearFilter(e);
      return;
    }

    const movies = [...this.state.movies];
    const filteredElements = movies.filter((movie) => {
      if (movie.type === filter) {
        return movie;
      }
    })

    this.setState({
      filter: {...this.state.filter, currentFilter: filter, elementsFiltered: filteredElements}
    })
  }

  clearFilter(e) {
    e.preventDefault();

    this.setState({
      filter: {...this.state.filter, currentFilter: "", elementsFiltered: []}
    })
  }

  /**
   * SEARCH
   */

  async searchMovie(e) {
    e.preventDefault();

    if (!this.searchInput.value.length) {
      const movies = await searchMovies({ terms: "matrix" });
      this.setState({ movies, search: "" })
      return;
    }

    const search = this.searchInput.value;
    const movies = await searchMovies({ terms: search });

    let types = movies.map((element) => { return element.type; })
    types = types.filter((elem, pos) => { return types.indexOf(elem) == pos; });

    this.setState({ 
      movies,
      search,
      filter: {...this.state.filter, allFilters: types, elementsFiltered: []},
    })
  }

  /**
   * PAGINATION
   */

  async goPreviousPage(e) {
    e.preventDefault();
    const page = this.state.page - 1;

    const movies = await searchMovies({
      terms: this.state.current,
      page: page
    });

    this.setState({ movies, page })
  }

  async goNextPage(e) {
    e.preventDefault();
    const page = this.state.page + 1;

    const movies = await searchMovies({
      terms: this.state.current,
      page: page
    });

    this.setState({ movies, page })
  }

  render() {
    const filters = this.state.filter;
    let movies = [];

    if (filters.elementsFiltered.length) {
      movies = filters.elementsFiltered;
    } else {
      movies = this.state.movies;
    }
    
    return (
      <div className="Home">
        <div className="Home__main">
          <div className="container">
          <div className="Searchbar">
            <h3 className="Searchbar__title">Rechercher un film en particulier ?</h3>
            <div className="Searchbar__field">
              <input type="text" placeholder="Votre film" className="Searchbar__input" ref={(input) => this.searchInput = input} onChange={(e) => this.searchMovie(e)}/>
              <RaisedButton onClick={(e) => this.searchMovie(e)}  label="Rechercher"/>
            </div>
            {
              this.state.search &&
              <div className="Searchbar__query">Vos résultats pour votre recherche <strong>{this.state.search}</strong></div>
            }
          </div>
          
          <div className="Filters">
          {
            filters.allFilters.map((filter, i) => {
              return (
                <RaisedButton key={filter} onClick={(e) => this.filterType(e, filter)} primary={filters.currentFilter === filter ? true : false} label={filter} style={style}/>
              );
            })
          }
          <RaisedButton onClick={(e) => this.clearFilter(e)} label="clear filters" 
          className="Filters__clear-button"/>
          </div>
            <TransitionGroup className="Card-All">
              {movies.map((movie, i) => {
                return (
                  <Fade key={movie.imdb}>
                  <div className="Card">
                    <Card>
                      <Link to={`/movie/${movie.imdb}`} className="Card-link">
                        <div ref={img => (this.refImages[i] = img)}>
                          <CardMedia
                            className="Card-media"
                            style={{ backgroundImage: `url(${movie.poster})` }}
                            overlayContentStyle={{ background: "transparent" }}
                            overlayStyle={{ color: "#fff" }}
                          />
                        </div>
                      </Link>
                      <CardTitle>{movie.title}</CardTitle>
                    </Card>
                  </div>
                </Fade>
                );
              }
             )}
            </TransitionGroup>
          </div>
        </div>

        <Pagination
          handleGoPreviousPage={(e) => this.goPreviousPage(e)}
          handleGoNextPage={(e) => this.goNextPage(e)}
          page={this.state.page}
        />

      </div>
    );
  }
}


export default Home;
