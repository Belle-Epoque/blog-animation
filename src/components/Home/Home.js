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

    this.searchBlock = null;
    this.afficher = null;
    this.remove = null;

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

  anim() {
    TweenMax.to(this.afficher, 0, { display:"none" });
    TweenMax.to(this.remove, 0, { display:"block" });
    TweenMax.to(this.searchBlock, 0.6, { left:0+'%' });
  }

  animRemove() {
    TweenMax.to(this.afficher, 0, { display:"block" });
    TweenMax.to(this.remove, 0, { display:"none" });
    TweenMax.to(this.searchBlock, 0.6, { left:-100+'%' });
  }

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

    return (
      <div className="Home">
        <div className="Home-intro">
          <div className="container">
          <p onClick={() => this.anim()}
            ref={(afficher) => { this.afficher = afficher; }}>
            Afficher les filtres de recherche</p>
          <p className='remove' 
            onClick={() => this.animRemove()}
            ref={(remove) => { this.remove = remove; }}>
            Enlever les filtres de recherche</p>
          <div className="doSearch"
               ref={(searchBlock) => { this.searchBlock = searchBlock; }}> 
            <h2>Rechercher un film</h2>
            {/*SEARCH*/}
              <input className="searchInput"
                     placeholder="Nom du film"
                     onChange={() => this.valueTextInput()} 
                     ref={(input) => { this.textInput = input; }} />
              <button className="searchButton"
                      onClick={() => this.result(movies) }>Recherher</button>


            {/*SELECT BY TYPE*/}
            <div className='type'>
              <p>Par type</p>
              <select onChange={() => this.result(movies) } ref={(select) => { this.textSelect = select; }}>
                <option value=''>all</option>
                <option value='series'>series</option>
                <option value='movie'>movie</option>
              </select>
            </div>
          </div>

          {/*AFFICHAGE*/}
          <h2 className="title">Liste</h2>
            <TransitionGroup className="CardContainer">
              {movies.map((movie, i) => (
                <Fade key={movie.imdb}>
                  <div className="Card">
                    <Card>
                      <Link to={`/movie/${movie.imdb}`} className="Card-link">
                        <CardHeader
                          title={movie.title}
                        />
                        <div ref={img => (this.refImages[i] = img)}>
                          <CardMedia
                            className="Card-media"
                            style={{ backgroundImage: `url(${movie.poster})` }}
                            overlayContentStyle={{ background: "transparent" }}
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

          <div className="pagination">
            { 
              this.state.page != 1 &&
              <p onClick={() => this.prevPage()}>Prev</p>
            }

            <h4>{this.state.page}</h4>

            { 
              this.state.page < 100 &&
              <p onClick={() => this.nextPage()}>Next</p>
            }
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
