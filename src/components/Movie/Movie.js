import React, { Component, Fragment } from "react";
import { getArticle, getMovie } from "../../api/api";
import BlackBox from "./BlackBox.js";
import "./Article.css";
import {Paper} from "material-ui";

class Article extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: {}
    };
  }

  async componentDidMount() {
    const movie = await getMovie(this.props.match.params.number);

    this.setState({ movie })
  }

  render() {
    const { movie } = this.state;
    return (
      <Fragment>
        <div className="Article-img" style={{ height: '80vh', position: 'relative', overflow: 'hidden' }}>
          <img style={{width: '100%', marginTop: -100}} src={movie.poster} alt=""/>
        </div>
        <div className="container" style={{ display: 'flex', justifyContent: 'center' }}>
          <Paper style={{ width: '40%', padding: 15, height: 100, position: 'absolute', bottom: '6vh', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 18 }} elevation={1}>{ movie.title }</Paper>
          <div className="Article-body">
              <p>{movie.plot}</p>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Article;
