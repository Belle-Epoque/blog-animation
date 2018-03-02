import React from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import { searchMovies } from "../../api/api"



const AutoCompleteExampleFilters = () => (
      <AutoComplete
        floatingLabelText="Type 'peah', fuzzy search"
        filter={AutoComplete.fuzzyFilter}
        dataSource={fruit}
        maxSearchResults={5}
      />
    </div>
  );
  
  export default AutoCompleteExampleFilters;