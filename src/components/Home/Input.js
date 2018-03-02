import React, { Component, Fragment } from "react";

import "./Input.css";

class Input extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Fragment>
        <input
          placeholder="Saisissez le nom de votre film..."
          className="advanced-search"
          ref={label => {
            this.valueLabel = label;
          }}
          type="text"
          onChange={() => this.props.updateInput()}
        />
      </Fragment>
    );
  }
}

export default Input;
