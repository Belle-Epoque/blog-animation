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
import { TweenMax } from "gsap";
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
      search: {
        terms: 'matrix',
        page: 1
      },
      views: 10,
      show: false,
      type: ["all", "series", "movie", 'episode']
    };

    // Tableau de référence des images.
    this.refImages = [];
  }

  componentWillMount(){
    window.addEventListener('scroll', this.onScrollWindow)
  }
 
  componentWillUnmount(){
    window.addEventListener('scroll', this.onScrollWindow)
  }

  async componentDidMount() {
    const {search} = this.state;
    const movies = await searchMovies(search);

    this.setState({
      movies,
      show: true
    });
  }

  onScrollWindow = () => {
    const {movies, views} = this.state;
    document.body.scrollHeight === window.scrollY + window.innerHeight && this.addMovies(views + 10);
  }

  animate(i) {
    TweenMax.to(this.refImages[i], 2, { opacity: 0 });
  }

  onChangeSearchBar = ({target: {value}}) => {
    const search = {...this.state.search, terms: value.trim().length > 0 ? value : 'matrix'};
    this.setState({search});
    this.searchMovies(search);
  }

  async searchMovies(search){
    const movies = await searchMovies(search);
    this.setState({movies});
  }
  
  async addMovies(views){
    const {search, movies} = this.state;
    const newSearch = {...search, page: views / 10};
    const newMovies = await searchMovies(newSearch);

    this.setState({movies: movies.concat(newMovies), views});
  }

  onChangeInput = ({target: {value}}) => {
    const search = parseInt(value)
      ?  {...this.state.search, year: value.length > 3 ? value : ''}
      :  {...this.state.search, type: value !== 'all' ? value : ''}
    this.searchMovies(search);
  }
  
  render() {
    const {movies, search, views, type} = this.state;
    console.log(movies);
    return (
      <div className="Home">
        <div className="Home-intro">
          <div>
            <label htmlFor="search">{'search :'}</label>
            <input id="search" type="text" onChange={(e) => this.onChangeSearchBar(e)}/>
            <label htmlFor="type">{'type :'}</label>
            <select id="type" onChange={this.onChangeInput} name={'movie'}>
              {type.map((value, key) => (
                <option value={value} key={key}>{value}</option>
              ))};
            </select>
            <label htmlFor="year">{'year :'}</label>
            <input id="year" type="number" onChange={this.onChangeInput} />
          </div>
          <div className="container" ref={(ref) => this.refMovies = ref}>
            <TransitionGroup className="todo-list">
              {movies.map(({title, year, poster, type, imdb: id}, i) => poster !== 'N/A' && (
                <Fade key={id}>
                  <Link to={`/article/${id}`} className="Card-link">
                    <div className="Card" key={id}>
                        <img src={poster} alt="poster"/>
                        <h3>{title}</h3>
                        <p>{`${type}, ${year}`}</p>
                    </div>
                  </Link>
                </Fade>
              ))}
            </TransitionGroup>
          </div>
          {movies.length === 0 &&
            <div>{'no result found'}</div>
          }
        </div>
      </div>
    );
  }
}

export default Home;
