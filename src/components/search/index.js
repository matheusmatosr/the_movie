import React from 'react';
import '../../style/search.css';

const Search = (props) => {
  return (
    <div className="search-container">
      <input
        className="search-input"
        value={props.value}
        onChange={(event) => props.setSearchValue(event.target.value)}
        placeholder="Procure aqui..."
      />
    </div>
  );
};

export default Search;
