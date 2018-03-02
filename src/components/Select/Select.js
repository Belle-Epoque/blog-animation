import React, { Component } from "react";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";

const genres = [
  "Action",
  "Science-Fiction",
  "Thriller",
  "Horreur",
  "Comédie",
  "Drame"
];

/**
 * `SelectField` can handle multiple selections. It is enabled with the `multiple` property.
 */
export default class Select extends Component {
  state = {
    values: []
  };

  handleChange = (event, index, values) => this.setState({ values });

  menuItems(values) {
    return genres.map(genre => (
      <MenuItem
        key={genre}
        insetChildren={true}
        checked={values && values.indexOf(genre) > -1}
        value={genre}
        primaryText={genre}
      />
    ));
  }

  render() {
    const { values } = this.state;
    return (
      <SelectField
        multiple={true}
        hintText="Sélectionnez un genre"
        value={values}
        onChange={this.handleChange}
      >
        {this.menuItems(values)}
      </SelectField>
    );
  }
}
