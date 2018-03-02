import React, { Component } from "react";
import { Card, CardHeader, CardMedia, CardTitle, CardText } from "material-ui/Card";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { searchMovies, getMovie } from "../../api/api";
import { Link } from "react-router-dom";
// import "bootstrap/less/bootstrap.less";
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
      movies: [],
      show: false,
    };
    
    this.handlePageChange = this._handlePageChange;

    // Tableau de référence des images.
    this.refImages = [];

  }

  
  async componentDidMount() {
    
    // //const movies = await searchMovies("matrix");
    // const movies = await searchMovies({
    //   terms: "matrix", // Required string
    //   //year: 1999, // optional number
    //   page: 1, // optional number (1 - 100)
    //   //type: "movie" // optional string ("series" || "movie" || "episode")
    // });
    // console.log("DEBUG", movies);

    
    let fullArray = [];
    
      for (let i = 1; i < 100; i++) {
    
        let search = await searchMovies({
          terms: "matrix",
          page: i
        });
    
        fullArray = fullArray.concat(search).filter(article => article.poster !== undefined).filter(article => article.poster.indexOf("https") !== -1);
        if (search.length === 0) {
          break;
        }
      //   const firstFullDataMovie =
      //   search.length > 0 ? await getMovie(search[0].imdb) : {};
      // console.log(firstFullDataMovie);
      }

      fullArray.length = 12;

      this.setState({
        movies: fullArray,
        show: true
      });
  }

  async LookingForMovies(e) {

    let fullArray = [];
    
      for (let i = 1; i < 100; i++) {
    
        let search = await searchMovies({
          terms: this.title.value,
          page: i
        });
    
        if (search.length === 0) {
          break;
        }
    
        fullArray = fullArray.concat(search).filter(article => article.poster !== undefined).filter(article => article.poster.indexOf("https") !== -1);
    
      }

      this.setState({
        movies: fullArray,
        show: true
      });
  }
  

  render() {
    
    const movies = this.state.movies;
    return (
      <div className="Home">
        <div className="Home-intro">
          <div className="container">
            <label>Rechercher</label>
            <br/>
            <input type="text" ref={title => (this.title = title)} onKeyPress={(e) => { if (e.key === 'Enter' && (e.target.value !== '')) {this.LookingForMovies(e)}}} />
            <TransitionGroup className="todo-list">
              {movies.filter(movie => movie.poster.indexOf("https") !== -1).map((movie, i) => (
                <Fade key={movie.imdb}>
                  <div className="Card">
                    <Card>
                      <Link to={`/article/${movie.imdb}`} className="Card-link">
                        <CardHeader
                          title="Bob"
                          subtitle="Web dev"
                          avatar="https://cdn.drawception.com/images/avatars/569903-A55.jpg"
                        />
                        <div ref={img => (this.refImages[i] = img)}>
                          <CardMedia
                            className="Card-media"
                            style={{ backgroundImage: `url(${movie.poster})` }}
                            overlay={<CardTitle title={movie.title}/>}
                            overlayContentStyle={{ background: "#00000087" }}
                            overlayStyle={{ color: "#fff" }}
                          />
                        </div>
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
