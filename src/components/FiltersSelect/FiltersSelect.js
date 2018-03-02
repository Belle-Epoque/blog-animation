import React, { Component } from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

class FiltersSelect extends Component {
    constructor(props){
        super(props);

        this.state = {
            filterValue: 0
        }
    }

    render(){
        const { onFilterChange } = this.props;

        return(
          <DropDownMenu
              value={this.state.filterValue}
              onChange={(event, key, value) => onFilterChange(event, key, value)}
          >
            <MenuItem value={0} primaryText="Filtrer par type" />
            <MenuItem value='movie' primaryText="Films" />
            <MenuItem value='series' primaryText="Séries" />
          </DropDownMenu>
        )
    }
}

export default FiltersSelect;