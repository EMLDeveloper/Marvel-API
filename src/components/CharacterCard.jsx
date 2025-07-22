import React from "react";
import { Link } from "react-router-dom";

function CharacterCard({ characters }) {
  if (characters.length === 0) {
    return <p className="found">No characters found.</p>;
  }

  return (
    <section className="character-dashboard">
      <div className="dashboard-content">
        <table className="dashboard-table">
          <thead>
            <tr>
              <th>Details</th>
              <th>Image</th>
              <th>Name</th>
              <th>Description</th>
              <th>Comics</th>
              <th>Series</th>
            </tr>
          </thead>
          <tbody>
            {characters.map((char) => {
              const imageUrl = `${char.thumbnail.path}/standard_xlarge.${char.thumbnail.extension}`;
              return (
                <tr key={char.id}>
                  <td>
                    <Link to={`/character/${char.id}`}>
                      <button className="view-btn">View Details</button>
                    </Link>
                  </td>
                  <td>
                    <img src={imageUrl} alt={char.name} className="table-img" />
                  </td>
                  <td>{char.name}</td>
                  <td>
                    {char.description
                      ? char.description
                      : "No description available"}
                  </td>
                  <td>{char.comics.available}</td>
                  <td>
                    {char.series.items.length > 0
                      ? char.series.items
                          .slice(0, 3)
                          .map((serie) => serie.name)
                          .join(", ") +
                        (char.series.items.length > 3 ? "..." : "")
                      : "No series"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default CharacterCard;
