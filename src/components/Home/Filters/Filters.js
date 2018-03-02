import React from "react";
import RaisedButton from 'material-ui/RaisedButton';

const Filters = ({ style, filtersAllFilters, filtersCurrentFilter, handleClickOnFilter, handleClearFilter }) => {
    return (
        <div className="Filters">
          {
            filtersAllFilters.map((filter, i) => {
              return (
                <RaisedButton key={filter} onClick={handleClickOnFilter} primary={filtersCurrentFilter === filter ? true : false} label={filter} style={style}/>
              );
            })
          }
          <RaisedButton onClick={handleClearFilter} label="clear filters" 
          className="Filters__clear-button"/>
          </div>
    );
}

export default Filters;