import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import FilterDropdown from "./components/FilterDropdown";
import CharacterCard from "./components/CharacterCard";
import SummaryStats from "./components/SummaryStats";
import { fetchMarvelCharacters } from "../marvelApi";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./App.css";

function App() {
  const [characters, setCharacters] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSeries, setSelectedSeries] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      try {
        const data = await fetchMarvelCharacters(100);
        setCharacters(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    getData();
  }, []);

  const filteredCharacters = characters.filter((char) => {
    const matchesSearch = char.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesSeries =
      selectedSeries === "all" ||
      char.series.items.some((serie) => serie.name === selectedSeries);
    return matchesSearch && matchesSeries;
  });
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
      <Header />
      <div className="controls-bar">
        <SummaryStats
          total={totalCharacters}
          withSeries={charactersWithSeries}
          avgComics={avgComics}
        />
      </div>
      <main>
        {error && <p className="error">Error: {error}</p>}
        {isLoading ? (
          <p>Cargando personajes...</p>
        ) : (
          <>
            <div className="filters-container">
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
            <CharacterCard characters={filteredCharacters} />
          </>
        )}
      </main>
    </>
  );
}

export default App;
