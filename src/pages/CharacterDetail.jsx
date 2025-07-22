import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import MD5 from "crypto-js/md5";
import "../App.css";

const publicKey = import.meta.env.VITE_MARVEL_API_KEY;
const privateKey = import.meta.env.VITE_MARVEL_PRIVATE_KEY;

function CharacterDetail() {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const ts = Date.now().toString();
    const hash = MD5(ts + privateKey + publicKey).toString();

    const url = `https://gateway.marvel.com/v1/public/characters/${id}?ts=${ts}&apikey=${publicKey}&hash=${hash}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data.data.results.length === 0) {
          setError("Character not found");
        } else {
          setCharacter(data.data.results[0]);
        }
      })
      .catch(() => setError("Error loading character"));
  }, [id]);

  if (error) return <p>{error}</p>;
  const generateFallbackDescription = (name) => {
    return `${name} is one of Marvel's most intriguing figures — a hero (or villain) whose story is waiting to unfold. Stay tuned as the Marvel Universe continues to reveal its secrets.`;
  };

  if (!character)
    return <p className=" loading">Loading character details.....</p>;

  return (
    <div className="character-detail">
      <div className="character-card">
        <h2 className="character-name">{character.name}</h2>
        <img
          className="character-image"
          src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
          alt={character.name}
        />
        <p className="character-description">
          {character.description?.trim()
            ? character.description
            : generateFallbackDescription(character.name)}
        </p>

        <div className="info-section">
          <h3>Events</h3>
          {character.events.items.length > 0 ? (
            <ul className="info-list">
              {character.events.items.map((event) => (
                <li key={event.resourceURI}>{event.name}</li>
              ))}
            </ul>
          ) : (
            <p>No events available.</p>
          )}
        </div>

        <div className="info-section">
          <h3>Stories</h3>
          {character.stories.items.length > 0 ? (
            <ul className="info-list">
              {character.stories.items.map((story) => (
                <li key={story.resourceURI}>{story.name}</li>
              ))}
            </ul>
          ) : (
            <p>No stories available.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default CharacterDetail;
