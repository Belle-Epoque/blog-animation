import React, { Component, Fragment } from "react";
import './SearchBar.css';

class Search extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Fragment>
        <div className="SearchBar">
          <label>Rechercher votre film : </label>
          <input
            ref={label => {
              this.valueLabel = label;
            }}
            type="text"
            onChange={() => this.props.updateSearch()}
          />
        </div>
       
      </Fragment>
    );
  }
}

export default Search;