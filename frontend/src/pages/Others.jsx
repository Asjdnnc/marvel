import { useState, useEffect } from "react";
import axios from "axios";
import './Others.css';

const apiKey = import.meta.env.VITE_API_KEY;
const bearerToken = import.meta.env.VITE_bearerToken;

export default function Others() {
  const [initial, setInitial] = useState(true);
  const [movies, setMovies] = useState({});
  const [search, setSearch] = useState("");
  const [initialMovies, setInitialMovies] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/movies")
      .then((response) => {
        setInitialMovies(response.data);
      })
      .catch((err) => console.error("Error fetching movies:", err));
  }, []);

  async function fetchMovieId(movie) {
    const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(movie)}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${bearerToken}`
      }
    });
    const data = await response.json();
    return data.results[0]?.id;
  }

  async function fetchMovieDetails(movieId) {
    const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }

  const handleSearch = async () => {
    const movieId = await fetchMovieId(search);
    const details = await fetchMovieDetails(movieId);
    details.poster_path = `https://image.tmdb.org/t/p/w500${details.poster_path}`;
    setInitial(false);
    setMovies(details);
  };

  return (
    <div className="page-container">
      <div className="search-container">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search for a movie"
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">
          Search &nbsp;<i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </div>
      {initial ? (
        <div className="movies-grid">
          {Object.keys(initialMovies).length > 0 ? (
            Object.values(initialMovies).slice(0,10).map((movie) => (
              <a href={`/movies/${movie._id}`} key={movie._id} className="movie-card">
                <img src={movie.poster_path} alt={movie.title} />
                <p className="text">{movie.title}</p>
                <p className="release-date">
                  {`${new Date(movie.release_date).toLocaleString('default', { month: 'long' })} ${new Date(movie.release_date).getFullYear()}`}
                </p>
              </a>
            ))
          ) : null}
        </div>) : null}
      {(!initial && !movies.title) ? (
        <div className="not-found-container">
          <img className="not-found-image" src="https://cdn.dribbble.com/userupload/17283851/file/original-05fe99534f82d10c30cc38661916e864.png?format=webp&resize=400x300&vertical=center" alt="Not Found" />
        </div>
      ) : !initial && movies.title ? (
        <div className="details-container">
          <div className="details">
            <h1>{movies.title}</h1>
            <p>Tagline: {movies.tagline}</p>
            <p style={{ color: "grey" }}>{movies.overview}</p>
            <p>Release Date: {`${new Date(movies.release_date).toLocaleString('default', { month: 'long' })} ${new Date(movies.release_date).getFullYear()}`}</p>
            <p>Runtime: {movies.runtime} mins</p>
            <p>Genres: {movies.genres.map((genre) => genre.name).join(', ')}</p>
            <p>Budget: ${movies.budget.toLocaleString()}</p>
            <p>Revenue: ${movies.revenue.toLocaleString()}</p>
            <p>Vote Average: {movies.vote_average} <i className="fa-solid fa-star" style={{ color: "#e8b10c" }}></i></p>
            <p>Production Companies: {movies.production_companies.map((company) => company.name).join(', ')}</p>
          </div>
          <img src={`https://image.tmdb.org/t/p/w500${movies.poster_path}`} alt={movies.title} className="img" />
        </div>
      ):null}
    </div>
  );
}
