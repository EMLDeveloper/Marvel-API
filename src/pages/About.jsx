import React from "react";
import "../App.css";

export default function About() {
  return (
    <section className="about-container">
      <h1 className="about">About MarvelDB</h1>
      <p className="about-intro">
        Marvel Entertainment, LLC, a subsidiary of The Walt Disney Company, is a
        global leader in entertainment known for its iconic characters,
        thrilling stories, and rich universe spanning comics, movies, TV shows,
        and more.
      </p>

      <div className="about-content">
        <div className="about-text">
          <h2 className="about-subtitle">Description:</h2>
          <p>
            Since its founding in 1939 (originally as Timely Comics), Marvel has
            introduced legendary superheroes such as Spider-Man, Iron Man,
            Captain America, Thor, and the X-Men. The Marvel Universe has grown
            to become a vibrant, interconnected world that captivates audiences
            of all ages.
          </p>
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
          <ul className="about-facts">
            <h2 className="about-subtitle">Facts:</h2>
            <li>📅 Founded: 1939 as Timely Comics</li>
            <li>🦸‍♂️ First Superhero: Human Torch (1939)</li>
            <li>🎬 Over 30 MCU films released</li>
            <li>📚 8,000+ characters in the Marvel database</li>
            <li>🌍 Available in over 75 countries</li>
          </ul>
          <div className="images-about">
            <img
              className="about-image"
              src="https://images.wsj.net/im-30228198?width=1280&size=1.000&pixel_ratio=2"
              alt="Marvel Logo"
            />
            <img
              className="about-image"
              src="https://res.cloudinary.com/jerrick/image/upload/d_642250b563292b35f27461a7.png,f_jpg,fl_progressive,q_auto,w_1024/fpajkl2zgeuu5hn93pll.jpg"
              alt="Marvel Logo"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
