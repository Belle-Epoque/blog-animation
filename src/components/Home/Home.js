import React, { Component } from "react";
import {
  Card,
  CardHeader,
  CardMedia,
  CardTitle,
  CardText
} from "material-ui/Card";
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { searchMovies, getMovie } from "../../api/api";
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
      movies: [],
      show: true,
      value: 1
    };

    // Tableau de référence des images.
    this.refImages = [];
  }

    setStateAsync(state) {
    return new Promise(resolve => {
      this.setState(state, resolve);
    });
  }

  async componentDidMount() {

    const movies = await searchMovies("iron man");

    this.setState({
      movies,
      show: true
    });

  }

  animate(i) {
    TweenMax.to(this.refImages[i], 2, { opacity: 0 });
  }

  async test(e) {

    console.log(e)

/*
      const movies =  setTimeout( function()
      {
         searchMovies("star wars")
      }, 1000)
*/
      const movies = await searchMovies("star wars");

      this.setState({
        movies,
        show: true
      });
  }


   handleChange = (event, index, value) => this.setState({value});

  render() {
    const movies = this.state.movies;

    return (
      <div className="Home">
        <div className="Home-intro">

          <TextField hintText="Hint Text" onChange={this.test.bind(this) } />

          <SelectField
            value={this.state.value}
            onChange={this.handleChange}
          >
            {
              this.state.movies.map((mov, j) => (
                <MenuItem value={j} primaryText={mov.year} />
              ))
            }
          </SelectField>

        </div>
        <div className="Home-content">
          <div className="container">



            {this.state.movies.map((movie, i) => (
              <Fade key={movie.imdb}>
                <div className="Card">

                  <Card>
                    <Link to={`/article/${movie.imdb}`} className="Card-link">
                      <div ref={img => (this.refImages[i] = img)}>
                        <CardMedia
                          className="Card-media"
                          style={{ backgroundImage: `url(${movie.poster})` }}
                          overlay={<CardTitle title={movie.title} subtitle={movie.date}/>}
                          overlayContentStyle={{ background: "transparent" }}
                          overlayStyle={{ color: "#fff" }}
                        />
                      </div>
                    </Link>
                  </Card>
                </div>
              </Fade>
            ))};





          </div>
        </div>
      </div>
    );
  }
}

export default Home;
