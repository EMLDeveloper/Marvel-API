import React, { useEffect, useState } from "react";
import MD5 from "crypto-js/md5";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  CartesianGrid,
  Legend,
} from "recharts";
import "../App.css";

const publicKey = import.meta.env.VITE_MARVEL_API_KEY;
const privateKey = import.meta.env.VITE_MARVEL_PRIVATE_KEY;

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#00bcd4", "#fff"];

export default function Stats() {
  const [characterData, setCharacterData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const ts = Date.now().toString();
      const hash = MD5(ts + privateKey + publicKey).toString();
      const url = `https://gateway.marvel.com/v1/public/characters?limit=100&ts=${ts}&apikey=${publicKey}&hash=${hash}`;
      const res = await fetch(url);
      const data = await res.json();
      setCharacterData(data.data.results);
    }

    fetchData();
  }, []);

  // Extract datasets for charts
  const topComics = [...characterData]
    .sort((a, b) => b.comics.available - a.comics.available)
    .slice(0, 5)
    .map((char) => ({
      name: char.name,
      comics: char.comics.available,
    }));

  const genderDist = [
    {
      name: "Male",
      value: characterData.filter((c) => c.name.includes("Man")).length,
    },
    {
      name: "Female",
      value: characterData.filter(
        (c) => c.name.includes("Woman") || c.name.includes("Girl")
      ).length,
    },
    {
      name: "Unknown",
      value: characterData.filter(
        (c) =>
          !c.name.includes("Man") &&
          !c.name.includes("Woman") &&
          !c.name.includes("Girl")
      ).length,
    },
  ];

  const firstAppearance = characterData
    .map((char) => {
      const date = char.modified ? new Date(char.modified).getFullYear() : null;
      return { year: date };
    })
    .filter((c) => c.year)
    .reduce((acc, curr) => {
      const found = acc.find((a) => a.year === curr.year);
      if (found) found.count += 1;
      else acc.push({ year: curr.year, count: 1 });
      return acc;
    }, [])
    .sort((a, b) => a.year - b.year)
    .slice(-10);

  return (
    <section className="stats">
      <h2 className="stats-title">Marvel Stats Overview</h2>
      <div className="charts-row">
        <div className="text-stats">
          <p>
            This app lets you explore characters, series, comics, and stats from
            the Marvel Universe through data fetched directly from the Marvel
            API. Dive into detailed character info, view exciting stats, and
            discover the vast stories behind your favorite heroes!
          </p>
          <p>
            Whether you're a longtime fan or new to Marvel, we hope MarvelDB
            fuels your passion and curiosity for this legendary universe.
          </p>
        </div>
        <div className="chart-box">
          <h3>Top 5 Characters by Comics</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={topComics}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="comics" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-box">
          <h3>Gender Distribution (Guess Based)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={genderDist}
                dataKey="value"
                nameKey="name"
                outerRadius={90}
                label
              >
                {genderDist.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-box">
          <h3>Characters by Last Modified Year</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={firstAppearance}>
              <XAxis dataKey="year" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="count"
                stroke="#82ca9d"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}
