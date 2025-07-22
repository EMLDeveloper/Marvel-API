import React, { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import FilterDropdown from "../components/FilterDropdown";
import CharacterCard from "../components/CharacterCard";
import SummaryStats from "../components/SummaryStats";
import { fetchMarvelCharacters } from "/marvelApi";
import DashboardCharts from "../components/DashboardChart";
import "../App.css";

function Dashboard() {
  const [characters, setCharacters] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSeries, setSelectedSeries] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showCharts, setShowCharts] = useState(false);

  const [sortOption, setSortOption] = useState("name-asc");
  const [selectedYear, setSelectedYear] = useState(1960);

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      try {
        const data = await fetchMarvelCharacters(50);
        setCharacters(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    getData();
  }, []);

  // Filter logic
  const filteredCharacters = characters.filter((char) => {
    const matchesSearch = char.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesSeries =
      selectedSeries === "all" ||
      char.series.items.some((serie) => serie.name === selectedSeries);

    // Simulate year (fallback to random)
    const debutYear =
      char.startYear || char.firstAppearance || 1970 + (char.id % 50);
    const matchesYear = debutYear >= selectedYear;

    return matchesSearch && matchesSeries && matchesYear;
  });

  // Sorting logic
  const sortedCharacters = [...filteredCharacters].sort((a, b) => {
    if (sortOption === "name-asc") return a.name.localeCompare(b.name);
    if (sortOption === "name-desc") return b.name.localeCompare(a.name);
    if (sortOption === "comics-desc")
      return (b.comics?.available || 0) - (a.comics?.available || 0);
    return 0;
  });

  // Stats
  const totalCharacters = filteredCharacters.length;
  const charactersWithSeries = filteredCharacters.filter(
    (c) => c.series.available > 0
  ).length;
  const avgComics = totalCharacters
    ? (
        filteredCharacters.reduce((sum, c) => sum + c.comics.available, 0) /
        totalCharacters
      ).toFixed(1)
    : 0;

  // Series count
  const seriesCharacterCount = characters.reduce((acc, char) => {
    char.series.items.forEach((serie) => {
      acc[serie.name] = (acc[serie.name] || 0) + 1;
    });
    return acc;
  }, {});

  const allSeriesWithCount = Object.entries(seriesCharacterCount)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <>
      <div className="father-container">
        <div className="controls-bar">
          <SummaryStats
            total={totalCharacters}
            withSeries={charactersWithSeries}
            avgComics={avgComics}
          />
          <div className="toggle-charts">
            <button onClick={() => setShowCharts((prev) => !prev)}>
              {showCharts ? "Hide Charts" : "Show Charts"}
            </button>
          </div>
          {showCharts && <DashboardCharts data={filteredCharacters} />}
        </div>

        <main>
          {error && <p className="error">Error: {error}</p>}
          {isLoading ? (
            <div className="spinner-container">
              <div className="spinner"></div>
              <p className="characters">Loading Characters...</p>
            </div>
          ) : (
            <>
              <div className="group">
                {/* FILTER INFO */}

                <div className="container-2 filter-section">
                  <label className="label">Search By:</label>
                  <div className="sides">
                    <SearchBar
                      searchQuery={searchQuery}
                      setSearchQuery={setSearchQuery}
                    />
                    <FilterDropdown
                      allSeries={allSeriesWithCount}
                      selectedSeries={selectedSeries}
                      setSelectedSeries={setSelectedSeries}
                    />
                  </div>
                </div>
                <div className="container-1 filter-info">
                  <label className="label">Data-Optimized Sort</label>
                  <select
                    className="option"
                    onChange={(e) => setSortOption(e.target.value)}
                    value={sortOption}
                  >
                    <option value="name-asc">Name (A-Z)</option>
                    <option value="name-desc">Name (Z-A)</option>
                    <option value="comics-desc">Most Comics</option>
                  </select>
                  <br />
                  <label className="data">
                    Debut Year From: {selectedYear}
                  </label>
                  <br />
                  <input
                    type="range"
                    min="1960"
                    max="2025"
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(Number(e.target.value))}
                  />
                </div>
              </div>

              <CharacterCard characters={sortedCharacters} />
            </>
          )}
        </main>
      </div>
    </>
  );
}

export default Dashboard;
