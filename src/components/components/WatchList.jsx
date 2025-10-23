import React, { useState } from "react";
import BackButton from "./common/BackButton";
import "./Watchlist.css";
import { useTranslation } from "react-i18next";

function WatchList({ watchlist = [], handleremove }) {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [sortBy, setSortBy] = useState("");

  const genreMap = {
    28: t('genres.action'),
    12: t('genres.adventure'),
    16: t('genres.animation'),
    35: t('genres.comedy'),
    80: t('genres.crime'),
    99: t('genres.documentary'),
    18: t('genres.drama'),
    10751: t('genres.family'),
    14: t('genres.fantasy'),
    36: t('genres.history'),
    27: t('genres.horror'),
    10402: t('genres.music'),
    9648: t('genres.mystery'),
    10749: t('genres.romance'),
    878: t('genres.sciFi'),
    10770: t('genres.tvMovie'),
    53: t('genres.thriller'),
    10752: t('genres.war'),
    37: t('genres.western'),
  };

  const getGenreName = (genreIds) => {
    if (!genreIds || genreIds.length === 0) return t('genres.unknown');
    return genreMap[genreIds[0]] || t('genres.unknown');
  };

  const getAllGenres = () => {
    const genresSet = new Set([t('watchlist.allGenres')]);
    watchlist.forEach((movie) => {
      if (movie.genre_ids && movie.genre_ids.length > 0) {
        const genre = genreMap[movie.genre_ids[0]];
        if (genre) genresSet.add(genre);
      }
    });
    return Array.from(genresSet);
  };

  const genres = getAllGenres();

  const getFilteredMovies = () => {
    let filtered = watchlist;

    if (selectedGenre !== t('watchlist.allGenres')) {
      filtered = filtered.filter((movie) => {
        const movieGenre = getGenreName(movie.genre_ids);
        return movieGenre === selectedGenre;
      });
    }

    if (searchTerm) {
      filtered = filtered.filter((movie) =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sortBy === "rating") {
      filtered = [...filtered].sort((a, b) => b.vote_average - a.vote_average);
    } else if (sortBy === "popularity") {
      filtered = [...filtered].sort((a, b) => b.popularity - a.popularity);
    }

    return filtered;
  };

  const handleDelete = (movie) => {
    if (handleremove) {
      handleremove(movie);
    }
  };

  const filteredMovies = getFilteredMovies();

  return (
    <div className="imdb-watchlist-container">
      <BackButton to="/" />

      <div className="imdb-watchlist-controls">
        <div className="imdb-watchlist-search-box">
          <input
            type="text"
            placeholder={t('watchlist.search')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="imdb-watchlist-search-input"
          />
          <span className="imdb-watchlist-search-icon">🔍</span>
        </div>

        <div className="imdb-watchlist-genre-filters">
          {genres.map(genre => (
            <button
              key={genre}
              className={`imdb-watchlist-genre-btn ${selectedGenre === genre ? 'imdb-watchlist-genre-active' : ''}`}
              onClick={() => setSelectedGenre(genre)}
            >
              {genre}
            </button>
          ))}
        </div>

        <div className="imdb-watchlist-sort-section">
          <label className="imdb-watchlist-sort-label">{t('watchlist.sortBy')}</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="imdb-watchlist-sort-dropdown"
          >
            <option value="">{t('watchlist.sortDefault')}</option>
            <option value="rating">{t('watchlist.sortRating')}</option>
            <option value="popularity">{t('watchlist.sortPopularity')}</option>
          </select>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="imdb-watchlist-mobile-cards">
        {filteredMovies.length > 0 ? (
          filteredMovies.map(movie => (
            <div key={movie.id} className="imdb-watchlist-mobile-card">
              <div className="imdb-watchlist-mobile-card-header">
                <img
                  src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                  alt={movie.title}
                  className="imdb-watchlist-mobile-poster"
                />
                <div className="imdb-watchlist-mobile-info">
                  <h3 className="imdb-watchlist-mobile-title">{movie.title}</h3>
                  <div className="imdb-watchlist-mobile-stats">
                    <div className="imdb-watchlist-mobile-stat">
                      <span className="imdb-watchlist-mobile-stat-label">⭐</span>
                      <span className="imdb-watchlist-mobile-rating-value">
                        {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
                      </span>
                    </div>
                    <div className="imdb-watchlist-mobile-stat">
                      <span className="imdb-watchlist-mobile-stat-label">📈</span>
                      <span className="imdb-watchlist-mobile-stat-value">
                        {movie.popularity ? Math.round(movie.popularity) : "N/A"}
                      </span>
                    </div>
                    <div className="imdb-watchlist-mobile-stat">
                      <span className="imdb-watchlist-mobile-genre-value">
                        {getGenreName(movie.genre_ids)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="imdb-watchlist-mobile-actions">
                <button
                  onClick={() => handleDelete(movie)}
                  className="imdb-watchlist-mobile-delete"
                >
                  🗑️ {t('watchlist.remove')}
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="imdb-watchlist-no-results">
            {t('watchlist.noResults')}
          </div>
        )}
      </div>

      {/* Desktop Table View */}
      <div className="imdb-watchlist-table-container">
        <table className="imdb-watchlist-movies-table">
          <thead>
            <tr>
              <th className="imdb-watchlist-th-name">{t('watchlist.movie')}</th>
              <th className="imdb-watchlist-th-rating">⭐ {t('watchlist.rating')}</th>
              <th className="imdb-watchlist-th-popularity">📈 {t('watchlist.popularity')}</th>
              <th className="imdb-watchlist-th-genre">{t('watchlist.genre')}</th>
              <th className="imdb-watchlist-th-action">{t('watchlist.action')}</th>
            </tr>
          </thead>
          <tbody>
            {filteredMovies.length > 0 ? (
              filteredMovies.map(movie => (
                <tr key={movie.id} className="imdb-watchlist-movie-row">
                  <td className="imdb-watchlist-movie-info">
                    <img
                      src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                      alt={movie.title}
                      className="imdb-watchlist-movie-poster"
                    />
                    <h3 className="imdb-watchlist-movie-name">{movie.title}</h3>
                  </td>
                  <td className="imdb-watchlist-movie-rating">
                    <span className="imdb-watchlist-rating-badge">
                      {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
                    </span>
                  </td>
                  <td className="imdb-watchlist-movie-popularity">
                    {movie.popularity ? Math.round(movie.popularity) : "N/A"}
                  </td>
                  <td className="imdb-watchlist-movie-genre">
                    <span className="imdb-watchlist-genre-badge">
                      {getGenreName(movie.genre_ids)}
                    </span>
                  </td>
                  <td className="imdb-watchlist-movie-action">
                    <button
                      onClick={() => handleDelete(movie)}
                      className="imdb-watchlist-delete-btn"
                    >
                      🗑️ {t('watchlist.remove')}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="imdb-watchlist-no-results">
                  {t('watchlist.noResults')}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default WatchList;
