import React from "react";

const Search = ({ search, setSearch, handleSearch }) => {
  return (
    <div className="container">
      <div className="search">
        <input
          type="text"
          placeholder="Search Location"
          name="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="search-btn" onClick={handleSearch}>
          Search
        </button>
      </div>
    </div>
  );
};

export default Search;
