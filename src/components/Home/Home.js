import React, { Component } from "react";
import {
  Card,
  CardHeader,
  CardMedia,
  CardTitle,
  CardText
} from "material-ui/Card";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { searchMovies, getMovie } from "../../api/api";
import { Link } from "react-router-dom";
import { TweenMax } from "gsap";
import "./Home.css";

const Fade = ({ children, ...props }) => (
  <CSSTransition {...props} timeout={1500} classNames="fade">
    {children}
  </CSSTransition>
);

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: [],
      show: false,
      input:'',
      valueType:'',
      page: 1,
    };

    // Tableau de référence des images.
    this.refImages = [];
  }

  async componentDidMount() {
    const movies = await searchMovies({
      terms: "blade", // Required string
      page: 1 // optional number (1 - 100)
    });
    this.setState({
      movies,
      show: true
    });
  }

  // animate(i) {
  //   TweenMax.to(this.refImages[i], 2, { opacity: 0 });
  // }

  // RESULT SEARCH & TYPE
  async result(movies) {
    this.resultAll(1);
  }

  async resultAll(page) {
    let value = this.textSelect.value;
    let inputText = this.state.input;
    if (inputText ===  '') {
      const filterType = await searchMovies({
        terms: 'blade', // Required string
        type: value,
        page: page
      });
      this.setState({
        movies: filterType,
      })
    } else {
      const filterType = await searchMovies({
        terms: inputText, // Required string
        type: value,
        page: page
      });
      this.setState({
        movies: filterType,
      })
    }
  }

  valueTextInput() {
    let input = this.textInput.value;
    this.setState({
      input
    });
  };

  // RESULT PREV PAGE
  prevPage() {
    let prevPage = this.state.page -1;
    this.setState({
      page: prevPage
    })
    this.resultAll(prevPage);
  }

  // RESULT NEXT PAGE
  nextPage() {
    let nextPage = this.state.page +1;
     this.setState({
      page: nextPage
    })
    this.resultAll(nextPage);
  }

  render() {
    const movies = this.state.movies;
    // console.log(movies);

    return (
      <div className="Home">
        <div className="Home-intro">
          <div className="container">

        {/*SELECT BY TYPE*/}
            <select onChange={() => this.result(movies) } ref={(select) => { this.textSelect = select; }}>
              <option value=''>all</option>
              <option value='series'>series</option>
              <option value='movie'>movie</option>
              {/*<option>episode</option>*/}
            </select>

          {/*SEARCH*/}
            <input placeholder="Nom du film"
                   onChange={() => this.valueTextInput()} 
                   ref={(input) => { this.textInput = input; }} />
            <button onClick={() => this.result(movies) }>Search </button>

          {/*AFFICHAGE*/}
            <TransitionGroup className="todo-list">
              {movies.map((movie, i) => (
                <Fade key={movie.imdb}>
                  <div className="Card">
                    <button onClick={() => this.animate(i)}>Click</button>
                    <Card>
                      <Link to={`/movie/${movie.imdb}`} className="Card-link">
                        <CardHeader
                          title={movie.title}
                        />
                        <h1>{movie.title}</h1>
                        <div ref={img => (this.refImages[i] = img)}>
                          <CardMedia
                            className="Card-media"
                            style={{ backgroundImage: `url(${movie.poster})` }}
                            overlay={<CardTitle title={movie.title} />}
                            overlayContentStyle={{ background: "transparent" }}
                            overlayStyle={{ color: "#fff" }}
                          />
                        </div>
                        <CardText>{movie.excerpt}</CardText>
                      </Link>
                    </Card>
                  </div>
                </Fade>
              ))}
            </TransitionGroup>
          </div>
          { 
            this.state.page != 1 &&
            <button onClick={() => this.prevPage()}>Prev</button>
          }

          <p>{this.state.page}</p>

          { 
            this.state.page < 100 &&
            <button onClick={() => this.nextPage()}>Next</button>
          }
        </div>
      </div>
    );
  }
}

export default Home;
