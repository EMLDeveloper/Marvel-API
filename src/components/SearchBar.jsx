import React from "react";

function SearchBar({ searchQuery, setSearchQuery, iconColor = "white" }) {
  return (
    <div className="search-bar">
      <i className="fas fa-search search-icon" style={{ color: iconColor }} />
      <input
        type="text"
        placeholder="Search by name..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;
