import "./Movie.css";
import { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "./common/MovieCard";
import { useTranslation } from "react-i18next";

function Movie({ handleAddWatchList, handleremove, watchlist }) {
  const { t } = useTranslation();
  const [movielist, setmovie] = useState([]);
  const [count, setcount] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    
    axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=8c8d4201c369e3061713ad1276a51176&language=en-US&page=${count}`
      )
      .then((res) => {
        setmovie(res.data.results);
        setLoading(false);
      })
      .catch((err) => {
        setError(t('movies.error'));
        setLoading(false);
        console.error('Error fetching movies:', err);
      });
  }, [count]);

  const isInWatchlist = (movie) => {
    return watchlist.some(item => item.id === movie.id);
  };

  if (loading) {
    return (
      <main className="movie-section">
        <h1 className="movie-section-title">{t('movies.title')}</h1>
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p className="loading-text">{t('movies.loading')}</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="movie-section">
        <h1 className="movie-section-title">{t('movies.title')}</h1>
        <div className="error-container">
          <p className="error-text">⚠️ {error}</p>
          <button className="retry-btn" onClick={() => setcount(count)}>
            {t('movies.retry')}
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="movie-section">
      <h1 className="movie-section-title">{t('movies.title')}</h1>
      
      <div className="movie-grid">
        {movielist.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onAddToWatchlist={handleAddWatchList}
            onRemoveFromWatchlist={handleremove}
            isInWatchlist={isInWatchlist(movie)}
          />
        ))}
      </div>

      <div className="movie-pagination">
        <button
          className="pagination-btn"
          onClick={() => setcount(count - 1)}
          disabled={count === 1}
        >
          {t('movies.previous')}
        </button>
        <span className="pagination-page">{t('movies.page')} {count}</span>
        <button
          className="pagination-btn"
          onClick={() => setcount(count + 1)}
        >
          {t('movies.next')}
        </button>
      </div>
    </main>
  );
}

export default Movie;
