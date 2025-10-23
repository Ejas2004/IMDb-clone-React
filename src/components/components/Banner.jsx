import React, { useState, useEffect } from "react";
import { Play, Star } from "lucide-react";
import BackButton from "./common/BackButton";
import "./Banner.css";
import Movie from "./Movie";
import { useTranslation } from "react-i18next";

function Banner({ handleAddWatchList, handleremove, watchlist }) {
  const { t } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);

  const featuredMovies = [
    {
      image: "https://m.media-amazon.com/images/M/MV5BZDU2Y2Y1NTQtNGQ4YS00N2FhLWJiYWItOTUwZmM0NzExZjcyXkEyXkFqcGc@._V1_QL75_UX787.5_.jpg",
      description: "Exploring the origins of Kaadubettu Shiva during the Kadamba dynasty era, it delves into the untamed wilderness and forgotten lore surrounding his past.",
      title: "Kantara A Legend: Chapter 1",
      rating: 8.2,
      year: "2025",
    },
    {
      image: "https://i.pinimg.com/736x/77/59/f3/7759f313447f46d8a7cd31b46201c93e.jpg",
      title: "The Dark Knight",
      description: "When a menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman, James Gordon and Harvey Dent must work together to put an end to the madness.",
      rating: 9.0,
      year: "2008",
    },
    {
      image: "https://mecinemas.com/assets/img/posters/SawX_banner.jpg",
      description: "A sick and desperate John travels to Mexico for a risky and experimental medical procedure in hopes of a miracle cure for his cancer only to discover the entire operation is a scam to defraud the most vulnerable.",
      title: "SAW X",
      rating: 7.5,
      year: "2023",
    },
    {
      image: "https://www.yashrajfilms.com/images/default-source/movies/veer-zaara/veer-zaara_mobile.jpg?sfvrsn=c2f5cc_8",
      description: "An Indian Air Force pilot rescues a Pakistani girl stranded in India. Years later, a lawyer seeks to unravel the truth behind the pilot's mysterious imprisonment in Pakistan for over two decades, during which he remained silent.",
      title: "Veer Zaara",
      rating: 7.8,
      year: "2004",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredMovies.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [featuredMovies.length]);

  return (
    <>
      <div className="banner-container">
        <div className="banner-hero">
          <div
            className="banner-slider"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {featuredMovies.map((movie, index) => (
              <div key={index} className="banner-slide">
                <img
                  src={movie.image}
                  alt={movie.title}
                  className="banner-image"
                />
                <div className="banner-overlay">
                  <div className="banner-content">
                    <h1 className="banner-title">{movie.title}</h1>
                    <p className="banner-description">{movie.description}</p>
                    <div className="banner-meta">
                      <span className="banner-rating">
                        <Star size={16} fill="#f5c518" color="#f5c518" />
                        {movie.rating}
                      </span>
                      <span className="banner-year">{movie.year}</span>
                    </div>
                    <button className="banner-play-btn">
                      <Play size={20} />
                      {t('banner.watchNow')}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="banner-indicators">
            {featuredMovies.map((_, idx) => (
              <button
                key={idx}
                className={`banner-indicator ${idx === currentSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      <Movie
        handleAddWatchList={handleAddWatchList}
        handleremove={handleremove}
        watchlist={watchlist}
      />
    </>
  );
}

export default Banner;
