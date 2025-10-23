import React from "react";
import "./MovieCard.css";

function MovieCard({ movie, onAddToWatchlist, onRemoveFromWatchlist, isInWatchlist }) {
  
  const handleToggleWatchlist = () => {
    if (isInWatchlist) {
      onRemoveFromWatchlist(movie);
    } else {
      onAddToWatchlist(movie);
    }
  };

  return (
    <div
      className="movie-card"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.poster_path})`,
      }}
    >
      <button
        className={`watchlist-toggle ${isInWatchlist ? 'remove' : 'add'}`}
        onClick={handleToggleWatchlist}
        aria-label={isInWatchlist ? "Remove from watchlist" : "Add to watchlist"}
      >
        {isInWatchlist ? "✓" : "+"}
      </button>
      
      <div className="movie-card-overlay">
        <h3 className="movie-card-title">{movie.title}</h3>
        {movie.vote_average && (
          <div className="movie-card-rating">
            <span className="rating-star">★</span>
            <span className="rating-value">{movie.vote_average.toFixed(1)}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default MovieCard;
