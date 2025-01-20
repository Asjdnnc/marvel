import { useState, useEffect } from "react";
import axios from "axios";
import './Others.css';
import Trailer from "../components/Trailer";

const apiKey = import.meta.env.VITE_API_KEY;
const bearerToken = import.meta.env.VITE_bearerToken;

export default function Others() {
  const [initial, setInitial] = useState(true);
  const [movies, setMovies] = useState({});
  const [trailerKey, settrailerKey] = useState('');
  const [search, setSearch] = useState("");
  const [initialMovies, setInitialMovies] = useState({});
  const [loading,setloading] = useState(true);

  useEffect(() => {
    axios
      .get("https://marvel-w8vq.onrender.com/api/movies")
      .then((response) => {
        setInitialMovies(response.data);
        setloading(false);
      })
      .catch((err) => {console.error("Error fetching movies:", err);
      setloading(false)});
  }, []);

  async function fetchMovieId(movie) {
    const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(movie)}`;
    try{const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${bearerToken}`
      }
    });
    if(!response.ok)throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    if (data.results && data.results.length > 0) {
      return data.results[0].id;
  } else {
      return null;
  }
  }catch (error) {
    console.error('Error fetching the movie ID:', error);
    return null; 
  }}

  async function fetchMovieDetails(movieId) {
    const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }

async function fetchMovieTrailer(movieId) {
    const url = `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${bearerToken}`
        }
    };
    try {
        const response = await fetch(url, options);
        const data = await response.json();
        return data.results[0].key;
    } catch (error) {
        console.error('Error fetching movie trailer:', error);
        throw error;
    }
}
  const handleSearch = async () => {
    const movieId = await fetchMovieId(search);
    if (!movieId) {
      setInitial(false);
      setMovies({});
      settrailerKey('');
      return; // Exit
  }
  try{
    const details = await fetchMovieDetails(movieId);
    const trailer = await fetchMovieTrailer(movieId);
    details.poster_path = `https://image.tmdb.org/t/p/w500${details.poster_path}`;
    setInitial(false);
    setMovies(details);
    settrailerKey(trailer);
  }catch(error){
    console.error('Error fetching movie details or trailer:', error);
  }
}
  const handleKeyPress = async (event)=>{
    if (event.key === 'Enter') {
        await handleSearch();
  }
}
  return (
    <div className="page-container">
      <div className="search-container">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search for a movie"
          className="search-input"
          onKeyDown={handleKeyPress}
        />
        <button onClick={handleSearch} className="search-button">
          Search &nbsp;<i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </div>
      {loading?(<img src="https://cdn.dribbble.com/users/29051/screenshots/1671982/loading-anim-dribbble.gif" style={{paddingLeft:"470px",paddingTop:"50px",opacity:"1",height:"600px",width:"800px"}}/>)
      :initial ? (
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
          ) :  <h1>Search for movies online</h1>}
        </div>) :null}
      {(!initial && !movies.title) ? (
        <div className="not-found-container">
          <img className="not-found-image" src="https://cdn.dribbble.com/userupload/17283851/file/original-05fe99534f82d10c30cc38661916e864.png?format=webp&resize=400x300&vertical=center" alt="Not Found" />
        </div>
      ) : !initial && movies.title ? (
        <>
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
          {console.log(movies)}
          </div>
          <img src={`https://image.tmdb.org/t/p/w500${movies.poster_path}`} alt={movies.title} className="img" />
        </div>
        <Trailer link={`https://www.youtube.com/embed/${trailerKey}`}/>
        </>
      ):null}
    </div>
  );
}
