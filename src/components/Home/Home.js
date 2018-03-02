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
      queries:[],
      favs:[]
    };

    // QUERIES permet d'avoir un historique de recherches avec le titre cherché suivi du type.

    // Tableau de référence des images.
    this.refImages = [];
  }

  // async componentDidMount() {
  //
  //   //const movies = await searchMovies("matrix");
  //
  //   // const movies = await searchMovies({
  //   //   terms: "matrix", // Required string
  //   //   //year: 1999, // optional number
  //   //   // page: 1 // optional number (1 - 100)
  //   //   //type: "movie" // optional string ("series" || "movie" || "episode"),
  //   // });
  //   //
  //   // // const firstFullDataMovie =
  //   // //   movies.length > 0 ? await getMovie(movies[0].imdb) : {};
  //   // // console.log(firstFullDataMovie);
  //   //
  //   // this.setState({
  //   //   movies : movies.filter(article => article.poster !== undefined).filter(article => article.poster.indexOf("https") !== -1),
  //   //   show: true
  //   // });
  //   //
  //   // console.log("DEBUG", this.state.movies);
  //
  // }

async filterByType(e, array) {

  let type = this.filter.value;

  if (this.state.queries[0] === undefined) {

    alert("Aucune recherche en cours !")

  } else {

    let fullArray = [];

    for (let i = 1; i < 100; i++) {

      let filterByType = await searchMovies({
        terms: this.state.queries[0].query,
        type: type,
        page: i
      });

      if (filterByType.length === 0) {
        break;
      }

      fullArray = fullArray.concat(filterByType).filter(article => article.poster !== undefined).filter(article => article.poster.indexOf("https") !== -1);

    }

    console.log(fullArray);

    let queries = this.state.queries.slice();

    queries.unshift({query:this.state.queries[0].query,type:type});

    this.setState({
      movies: fullArray,
      queries: queries
    })

  }

}

async searchAMovie (e) {

  e.preventDefault();

  let query = e.target.value;

  let fullArray = [];

  for (let i = 1; i < 100; i++) {

    let search = await searchMovies({
      terms: query,
      type: this.filter.value,
      page: i
    });

    if (search.length === 0) {
      break;
    }

    fullArray = fullArray.concat(search).filter(article => article.poster !== undefined).filter(article => article.poster.indexOf("https") !== -1);

  }

  console.log(fullArray);

  let queries = this.state.queries.slice();

  queries.unshift({query:query,type:this.filter.value});

  this.setState({
    movies: fullArray,
    queries: queries
  })

  console.log(this.state.queries);

}


async addFav(id) {

  let movie = await getMovie(id);

  let fav = this.state.favs.slice();

  fav.unshift(movie);

  this.setState({
    favs: fav
  })

  console.log(this.state.favs);

}


animate(i) {
  TweenMax.to(this.refImages[i], 2, { opacity: 0 });
}

  render() {
    const articles = this.state.movies;

    const favs = this.state.favs

    return (
      <div className="Home">
        <div className="favoris">

          <h2>Favoris :</h2>

            <table>
              <tr>
                <th>Plot</th>
                <th>Title</th>
                <th>Poster</th>
              </tr>


              {favs.map((fav, i) => (
                <tr key={fav.imdb}>
                  <td>{fav.plot}</td>
                  <td>{fav.title}</td>
                  <td><img src={fav.poster} /></td>
                </tr>
              ))}

            </table>

        </div>
        <div className="Home-intro">
          <div className="container">
            <select ref={(option) => { this.filter = option; }} name="filter" onChange={(e) => this.filterByType(e, articles)}>
              Choisissez un filtre :
              <option value="">Tous</option>
              <option value="movie">Films</option>
              <option value="series">Séries</option>
              <option value="episode">Episodes</option>
            </select>
            <label>
              Rechercher:
              <input onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  this.searchAMovie(e)
                }
              }} type="text" />
            </label>
            <TransitionGroup className="todo-list">
              {articles.map((article, i) => (
                <Fade key={article.imdb}>
                  <div className="Card">
                    <button onClick={() => this.animate(i)}>Click</button>
                    <Card>
                      <Link to={`/article/${article.imdb}`} className="Card-link">
                        <CardHeader
                          title={article.title}
                          subtitle={article.plot}
                          avatar={article.poster}
                        />
                        <div ref={img => (this.refImages[i] = img)}>
                          <CardMedia
                            className="Card-media"
                            style={{ backgroundImage: `url(${article.poster})` }}
                            overlay={<CardTitle title={article.title} />}
                            overlayContentStyle={{ background: "transparent" }}
                            overlayStyle={{ color: "#fff" }}
                          />
                        </div>
                        <CardText>{article.plot}</CardText>
                      </Link>
                      <button onClick={() => this.addFav(article.imdb)}>Ajouter aux favoris</button>
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
