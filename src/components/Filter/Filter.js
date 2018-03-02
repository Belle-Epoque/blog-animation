import React, { Component, Fragment } from "react";

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      types : ["movie", "series", "episode"]
    };
  }
  render() {
      const types = this.state.types;
        return (
          <Fragment>
              <select
                className="select"
                name="form"
                ref={label => {
                  this.typeLabel = label;
                }}
                onChange={() => this.componentDidMount()}
              >
              {types.map((type, i) => (
                  <option value={types[i]}>{types[i]}</option>
              ))}
              </select>
          </Fragment>
      );
    }
}

export default Filter;
