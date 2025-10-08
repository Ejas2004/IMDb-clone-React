import React, { useState, useEffect } from "react";
import { Play, Heart, ThumbsUp } from "lucide-react";
import "./Banner.css";
import MBdNav from "./MBdNav";
import Movie from "./Movie";


function Banner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const upNext = [
    {
      title: "'Predator: Badlands'",
      duration: "1:58",
      likes: 214,
      hearts: 709,
      image:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fencrypted-tbn1.gstatic.com%2Fimages%3Fq%3Dtbn%3AANd9GcTbK4_DOSDY3CNYcoTkBTn-OAeV9ir3fHwiIlu9eA4G6Vss7zle&psig=AOvVaw1K30mwvA_T-xC3eaPmtXty&ust=1759943261381000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCLCSidrJkpADFQAAAAAdAAAAABAE",
    },
    {
      title: "Oppenheimer",
      duration: "10:37",
      likes: 295,
      hearts: 983,
      image:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fencrypted-tbn2.gstatic.com%2Fimages%3Fq%3Dtbn%3AANd9GcS-v82iAoNANJgZ6EATtRCYgJvaXN9L02Dg0V5-0oN9IFOQVluQ&psig=AOvVaw22ahBp9-EJamE0vv-vFtEb&ust=1759943504832000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCIDAoMzKkpADFQAAAAAdAAAAABAE",
    },
    {
      title: "Avenger : Endgame",
      duration: "2:09",
      likes: 143,
      hearts: 617,
      id: "avenger",
      image:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fencrypted-tbn1.gstatic.com%2Fimages%3Fq%3Dtbn%3AANd9GcRXef9DJnZiq5az0UnjkmvkQufOQ5MFnF7HATYRUXN913swRuH1&psig=AOvVaw0hAOQ1iKUoTCRv1DRPBIql&ust=1759943594277000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCKjzzPfKkpADFQAAAAAdAAAAABAE",
    },
  ];

  const mainframe = [
    {
      imgs: "https://www.dxbnewsnetwork.com/upload/newsimage/2025/10/04/kantara_2.jpg",
      des: "Exploring the origins of Kaadubettu Shiva during the Kadamba dynasty era, it delves into the untamed wilderness and forgotten lore surrounding his past.",
      title: "Kantara A Legend: Chapter 1",
      likes: 169,
      hearts: 33,
    },
    {
      imgs: "https://i.pinimg.com/736x/77/59/f3/7759f313447f46d8a7cd31b46201c93e.jpg",
      title: "The Dark Knight",
      des: "When a menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman, James Gordon and Harvey Dent must work together to put an end to the madness",
      likes: 245,
      hearts: 89,
    },
    {
      imgs: "https://mecinemas.com/assets/img/posters/SawX_banner.jpg",
      des: "A sick and desperate John travels to Mexico for a risky and experimental medical procedure in hopes of a miracle cure for his cancer only to discover the entire operation is a scam to defraud the most vulnerable.",
      title: "SAW X",
      likes: 198,
      hearts: 56,
    },
    {
      imgs: "https://www.yashrajfilms.com/images/default-source/movies/veer-zaara/veer-zaara_mobile.jpg?sfvrsn=c2f5cc_8",
      des: "An Indian Air Force pilot rescues a Pakistani girl stranded in India. Years later, a lawyer seeks to unravel the truth behind the pilot's mysterious imprisonment in Pakistan for over two decades, during which he remained silent.",
      title: "Veer Zaara",
      likes: 312,
      hearts: 124,
    },
  ];

  // Auto-slide effect - changes slide every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % mainframe.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [mainframe.length]);

  return (
    <>
    <MBdNav/>


    <div className="banner">
      {/* Left - Main Banner with Auto Slider */}
      <div className="banner-left">
        <div
          className="slider-container"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {mainframe.map((movie, index) => (
            <div key={index} className="slide">
              <img
                src={movie.imgs}
                alt={movie.title}
                className="banner-img"
              />

              <div className="banner-overlay">
                <div className="banner-content">
                  <h1>{movie.title}</h1>
                  <p>{movie.des}</p>

                  <div className="banner-buttons">
                    <button className="play-btn">
                      <Play size={18} /> Play
                    </button>
                    <div className="stats">
                      <span>
                        <ThumbsUp size={18} /> {movie.likes}
                      </span>
                      <span>
                        <Heart size={18} /> {movie.hearts}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dot Indicators */}
        <div className="dots">
          {mainframe.map((_, idx) => (
            <div
              key={idx}
              className={`dot ${idx === currentSlide ? "active" : ""}`}
            />
          ))}
        </div>
      </div>

      {/* Right - Up Next */}
      <div className="banner-right">
        <h2>TRENDING 2025</h2>
        <div className="upnext-list">
          {upNext.map((video, index) => (
            <div key={index} className="upnext-item">
              <div className="thumb">
                <img src={video.image} alt={video.title} id={video.id} />
                <span className="duration">{video.duration}</span>
              </div>
              <div className="info">
                <p className="title">{video.title}</p>
                <div className="meta">
                  <span>
                    <ThumbsUp size={14} /> {video.likes}
                  </span>
                  <span>💖 {video.hearts}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    {/* movie sepration section */}
<Movie/>

        </>
  );
}

export default Banner;