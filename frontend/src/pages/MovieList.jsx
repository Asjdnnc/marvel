import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./MovieDetails.css";
import "./MovieList.css";
import {
  nextMcuRelease,
  supplementalHomeMovies,
} from "../data/mcuSpotlight";
import {
  readWatchedMovies,
  writeWatchedMovies,
} from "../utils/watchedMovies";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [homeMovies, setHomeMovies] = useState([]);
  const [watchedMovies, setWatchedMovies] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch movies from the backend API
    axios
      .get("https://marvel-w8vq.onrender.com/api/movies") // backend API route
      .then((response) => {
        const apiMovies = response.data;
        const existingTitles = new Set(
          apiMovies.map((movie) => movie.title.toLowerCase())
        );
        const latestMovies = supplementalHomeMovies
          .filter((movie) => !existingTitles.has(movie.title.toLowerCase()));

        const mergedMovies = [...apiMovies, ...latestMovies].sort(
          (firstMovie, secondMovie) =>
            new Date(secondMovie.release_date) - new Date(firstMovie.release_date)
        );

        setHomeMovies(mergedMovies);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching movies:", err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setWatchedMovies(readWatchedMovies());
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const formatReleaseDate = (releaseDate) =>
    new Date(releaseDate).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

  const doomsdayDate = new Date(`${nextMcuRelease.releaseDate}T00:00:00`);
  const timeRemaining = doomsdayDate.getTime() - Date.now();
  const daysUntilDoomsday = Math.max(0, Math.ceil(timeRemaining / 86400000));
  const filteredMovies = homeMovies.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const totalMovies = homeMovies.length;
  const watchedCount = homeMovies.filter((movie) => watchedMovies[movie._id]).length;
  const watchedProgress = totalMovies > 0 ? (watchedCount / totalMovies) * 100 : 0;

  const toggleWatched = (movieId) => {
    setWatchedMovies((currentWatchedMovies) => {
      const updatedWatchedMovies = {
        ...currentWatchedMovies,
        [movieId]: !currentWatchedMovies[movieId],
      };
      writeWatchedMovies(updatedWatchedMovies);
      return updatedWatchedMovies;
    });
  };

  return (
    <div style={{ backgroundColor: "black", paddingBottom: "20px", minHeight: "110vh" }}>
      <div style={{ textAlign: "center", padding: "10px", color: "white", marginBottom: "10px" }}>
        <span style={{ fontSize: "80px", margin: "20px", color: "#e62429" }}>Marvel Movies</span>
        <br />
        <span>Discover the Marvel Cinematic Universe</span>
        <br />
        <br />
      </div>

      <section className="spotlight-shell">
        <article className="spotlight-panel next-release-panel">
          <div className="spotlight-copy">
            <span className="spotlight-badge">{nextMcuRelease.badge}</span>
            <h2>{nextMcuRelease.title}</h2>
            <p className="spotlight-date">{formatReleaseDate(nextMcuRelease.releaseDate)}</p>
            <p>{nextMcuRelease.description}</p>
            <div className="countdown-chip">
              <strong>{daysUntilDoomsday}</strong>
              <span>days until launch</span>
            </div>
            <a
              className="spotlight-link"
              href={nextMcuRelease.officialUrl}
              target="_blank"
              rel="noreferrer"
            >
              View Official Marvel Page
            </a>
          </div>
          <img
            className="spotlight-poster"
            src={nextMcuRelease.poster}
            alt={`${nextMcuRelease.title} poster`}
          />
        </article>
      </section>

      <div style={{ textAlign: "center", padding: "10px", color: "white", marginBottom: "10px" }}>
        <input
          type="text"
          placeholder="Search for marvel movie..."
          value={searchQuery}
          onChange={handleSearch}
          style={{
            padding: "10px",
            width: "100%",
            maxWidth: "700px",
            backgroundColor: "black",
            color: "white",
            fontSize: "16px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
        &nbsp;&nbsp;<i className="fa-solid fa-magnifying-glass"></i>
        <br />
      </div>

      <section className="progress-section">
        <div className="progress-copy">
          <strong>{watchedCount} of {totalMovies} watched</strong>
          <span>Track your MCU movie progress </span>
        </div>
        <div className="progress-track" aria-label="Watched movies progress">
          <div
            className="progress-fill"
            style={{ width: `${watchedProgress}%` }}
          />
        </div>
      </section>

      <div
        className="movie-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "20px",
          paddingLeft: "10px",
          paddingRight: "10px",
          maxWidth: "1200px", // Ensures the layout doesn't stretch too wide
          margin: "0 auto", // Centers the content horizontally
        }}
      >
        {loading ? (
          <div>
            <img
              src="https://cdn.dribbble.com/users/29051/screenshots/1671982/loading-anim-dribbble.gif"
              style={{
                paddingLeft: "400px",
                paddingTop: "50px",
                height: "500px",
                width: "600px",
              }}
            />
            <p style={{ color: "white", fontSize: "60px", marginLeft: "90%" }}>loading...</p>
          </div>
        ) : filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <div
              className="image2 movie-grid-card"
              key={movie._id}
              style={{
                border: "1px solid grey",
                borderRadius: "15px",
                padding: "10px",
                
                backgroundColor: "#151515",
                color: "white",
                textDecoration: "none",
              }}
            >
              <Link
                to={`/movies/${movie._id}`}
                className="movie-card-link"
                style={{ color: "white", textDecoration: "none"}}
              >
                <img
                  src={movie.poster_path}
                  alt={movie.title}
                  style={{
                    width: "100%",
                    textAlign: "center",
                    height: "350px",
                    objectFit: "fill",
                    opacity: "1",
                    borderRadius: "15px",
                  }}
                />
                <p className="text" style={{ fontSize: "21px" }}>
                  {movie.title}
                </p>
                <p className="text" style={{ color: "lightgrey" }}>
                  {`${new Date(movie.release_date).toLocaleString("default", { month: "long" })} ${new Date(movie.release_date).getFullYear()}`}
                </p>
              </Link>
              <button
                type="button"
                className={watchedMovies[movie._id] ? "watched-button active" : "watched-button"}
                onClick={() => toggleWatched(movie._id)}
              >
                {watchedMovies[movie._id] ? "Watched" : "Mark Watched"}
              </button>
            </div>
          ))
        ) : (
          <>
            <p style={{ color: "white", fontSize: "30px" }}>No movies found.</p>
            <p style={{ color: "white", fontSize: "30px" }}>
              Search the movie in <b>OTHERS</b> section
            </p>
          </>
        )}
      </div>
    </div>
  );
}
