import React, { Component, Fragment } from "react";

class AdvancedSearch extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Fragment>
          <div className="advancedSearch">
              <label className="label">Recherche avancée :</label>
              <input
                className="input"
                ref={label => {
                    this.valueLabel = label;
                }}
                type="text"
                onChange={() => this.props.updateInput()}
                placeholder="Tapez votre recherche"
             />
          </div>
      </Fragment>
    );
  }
}

export default AdvancedSearch;
