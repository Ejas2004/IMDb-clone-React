import React from "react";
import "./Movie.css";

function Movie() {
  const movielist = [
    {
      img: "https://i.pinimg.com/474x/00/49/4d/00494d5b0834cab801650e0b12c46266.jpg",
      title: "LEGION: Rise of the Fallen",
    },
    {
      img: "https://i.pinimg.com/736x/a6/5a/68/a65a681d7dcdbfccb51c66b27bbe7e70.jpg",
      title: "Heaven's Champion",
    },
    {
      img: "https://i.pinimg.com/736x/a7/17/44/a717446fa5ab08f628ebc989a370c420.jpg",
      title: "The Nameless Prophet",
    },
    {
      img: "https://i.pinimg.com/736x/5e/d3/e9/5ed3e92f4984ddf76ea35741cd8e2c05.jpg",
      title: "The Shadow of Light",
    },
    {
      img: "https://i.pinimg.com/1200x/94/b2/26/94b226698fb5c2497252c3dd1600c6b2.jpg",
      title: "Ascension",
    },
    {
      img: "https://i.pinimg.com/736x/b6/b5/c3/b6b5c3d2889f6f816df0ea231461f593.jpg",
      title: "Wings of Vengeance",
    },
    {
      img: "https://i.pinimg.com/1200x/a1/e9/76/a1e9766fce4586f069ba046ce0fc09b6.jpg",
      title: "The Blood of Kings",
    },
    {
      img: "https://i.pinimg.com/736x/02/07/4c/02074c26efa904dc0c6ea83565a1d3c2.jpg",
      title: "The Last Crusade",
    },
    {
      img: "https://i.pinimg.com/1200x/24/ff/60/24ff601514f9d6e205e6b1386a10143c.jpg",
      title: "Crimson Serenity",
    },
    {
      img: "https://i.pinimg.com/736x/15/1d/03/151d03455944dfa295c121139b26456d.jpg",
      title: "Dark Oath",
    },
  ];

  return (
    <main>
      <h1 id="main">TOP-10</h1>
      <div id="card-border">
        {movielist.map((movie, index) => (
          <div
            key={index}
            className="movie-card"
            style={{ backgroundImage: `url(${movie.img})` }}
          >
            <div className="overlay">
              <h2 className="title-text">{movie.title}</h2>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Movie;