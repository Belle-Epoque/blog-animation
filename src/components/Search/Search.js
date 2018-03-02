import React, { Component, Fragment } from "react";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";

const styleInput = {
  width: "300px",
  marginRight: 30
};

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textInput: "Put your search here",
      labelBtn: "Go"
    };
  }

  _handleClick() {
    let value = this.refInput.getValue();
    this.props.onSearch(value);
  }

  render() {
    const { textInput, labelBtn } = this.state;
    return (
      <Fragment>
        <TextField
          className="search__input"
          hintText={textInput}
          style={styleInput}
          ref={input => {
            this.refInput = input;
          }}
        />
        <RaisedButton
          className="search__btn"
          label={labelBtn}
          onClick={() => this._handleClick()}
        />
      </Fragment>
    );
  }
}

export default Search;
