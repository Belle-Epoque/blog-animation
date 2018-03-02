import React, { Component, Fragment } from "react";
import { getMovie } from "../../api/api";
import './Media.css';
import BlackBox from "./BlackBox.js";

class Media extends Component {
  constructor(props) {
    super(props);

    this.state = {
      media: {}
    };
  }

  componentDidMount() {
    this.refreshSingleMedia(this.props.match.params.id);
  }

  async refreshSingleMedia(media) {
    const filterMedia = await getMovie(media);

    if (!filterMedia) {
      // This article doesn't exist.
      return;
    }

    this.setState({
      media: filterMedia
    });
  }

  renderAwards = (awards) => {
    let array = [];
    for (var i in awards) {
      array.push([i,awards[i]]);
    }

    return (array.map((v, k) => (
      <li key={k} className='Media-award' data-award={v[0]}>{v[1]} {v[0] === 'text' ? '': v[0]}</li>
    )));
  }

  renderArray = (arr) => {
    if (arr) {
      return (arr.map((v, k) => (
        <li key={k} >{v}</li>
      )));
    }
  }

  render() {
    const {
      media
    } = this.state;

    return (
        <Fragment>
        <BlackBox />
        <div className='Media-single'>
          <div className='Media-banner' style={{ backgroundImage: `url(${media.poster})` }}>
            <h2 className='Media-Single-title'>{media.title}</h2>
          </div>
          <div className='Media-container'>
            <div className='Media-aside'>
              <div className='Media-poster'>
                <img src={media.poster} alt={media.title}/>
              </div>
              <div className='Media-awards'>
                <ul>
                  <li className='Media-boxOffice'>Box Office: {media.boxOffice}</li>
                  {this.renderAwards(media.awards)}
                </ul>
              </div>
            </div>
            <div className='Media-content'>
              <div className="Media-Single-info">
                <ul>
                  <li>
                    <span>Countries:</span>
                    <span>
                      <ul className='Listing'>
                        {this.renderArray(media.countries)}
                      </ul>
                    </span>
                  </li>
                  <li>
                    <span>Director:</span>
                    <span>
                      { (media.director) ? `${media.director}`: `Unknown` }
                    </span>
                  </li>
                  <li>
                    <span>Actors:</span>
                    <span>
                      <ul className='Listing'>
                        {this.renderArray(media.actors)}
                      </ul>
                    </span>
                  </li>
                  <li>
                    <span>Writers:</span>
                    <span>
                      <ul className='Listing'>
                        {this.renderArray(media.writers)}
                      </ul>
                    </span>
                  </li>
                  <li>
                    <span>Duration:</span>
                    <span>
                      {media.runtime} min
                    </span>
                  </li>
                  <li>
                    <span>Date:</span>
                    <span>
                      { (media.year && (media.year.from || media.year.to)) ? `${media.year.from} - ${media.year.to}`: media.year }
                    </span>
                  </li>
                  <li>
                    <span>Rated:</span>
                    <span>
                      {media.rated}
                    </span>
                  </li>
                </ul>
              </div>
              <div className='Media-Single-text'>
                <h3>Plot:</h3>
                <p>
                  {media.plot}
                </p>
              </div>
            </div>
            <div className='Media-score'>
              <h3>Scores:</h3>
              <ul>
                <li>
                  <span>Metacritic:</span>
                  <span>
                    { (media.metacritic) ? `${media.metacritic}`: `Not Rated Yet` }
                  </span>
                </li>
                <li>
                  <span>Imdb:</span>
                  <span>
                    { (media.imdb && media.imdb.rating ) ? `${media.imdb.rating}`: `Not Rated Yet` }
                  </span>
                </li>
                <li>
                  <span>Tomato:</span>
                  <span>
                    { (media.tomato && media.tomato.score ) ? `${media.tomato.score}`: `Not Rated Yet` }
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Media;
