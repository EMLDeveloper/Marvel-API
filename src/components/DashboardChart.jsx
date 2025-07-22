import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#00bcd4"];

export default function DashboardCharts({ data }) {
  const topComics = [...data]
    .sort((a, b) => b.comics.available - a.comics.available)
    .slice(0, 5)
    .map((char) => ({
      name: char.name,
      comics: char.comics.available,
    }));

  const genderDist = [
    {
      name: "Male",
      value: data.filter((c) => c.name.includes("Man")).length,
    },
    {
      name: "Female",
      value: data.filter(
        (c) => c.name.includes("Woman") || c.name.includes("Girl")
      ).length,
    },
    {
      name: "Unknown",
      value: data.filter(
        (c) =>
          !c.name.includes("Man") &&
          !c.name.includes("Woman") &&
          !c.name.includes("Girl")
      ).length,
    },
  ];

  const modifiedYears = data
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
    <div className="charts-container">
      <div className="chart-box">
        <h3>Top 5 by Comics</h3>
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
        <h3>Gender Distribution</h3>
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
        <h3>Last Modified (Year)</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={modifiedYears}>
            <XAxis dataKey="year" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="count" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
