import React from "react";
function FilterDropdown({ allSeries, selectedSeries, setSelectedSeries }) {
  return (
    <div className="filter-dropdown">
      <label className="filter-button">
        <i className="fas fa-sliders-h"></i>
        <span>Filter Info</span>
        <select
          className="native-select"
          value={selectedSeries}
          onChange={(e) => setSelectedSeries(e.target.value)}
        >
          <option key="all" value="all">
            All Series
          </option>
          {allSeries.map(({ name, count }) => (
            <option key={name} value={name}>
              {name} ({count})
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
export default FilterDropdown;
