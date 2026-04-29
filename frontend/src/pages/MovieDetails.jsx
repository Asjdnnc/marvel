import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./MovieDetails.css";
import "../components/Trailer.css";
import Trailer from "../components/Trailer";
import Music from "../components/Music";
import Related from "../components/Related";

import {
  getLocalMovieById,
  getLocalRelatedMovies,
} from "../data/movieCatalog";

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [localRelatedMovies, setLocalRelatedMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });

    const supplementalMovie = getLocalMovieById(id);

    if (supplementalMovie) {
      setMovie({
        ...supplementalMovie,
        isLocal: true,
      });
      setLocalRelatedMovies(getLocalRelatedMovies(supplementalMovie));
    } else {
      setMovie(null);
    }
    setLoading(false);
  }, [id]);

  const castList = Array.isArray(movie?.cast?.[0])
    ? movie.cast[0]
    : Array.isArray(movie?.cast)
      ? movie.cast
      : [];

  const ratingLabel = typeof movie?.vote_average === "number"
    && movie.vote_average > 0
    ? (
      <>
        {movie.vote_average} <i className="fa-solid fa-star" style={{ color: "#e8b10c" }}></i>
      </>
    )
    : movie?.vote_average || "TBA";

  const runtimeLabel = movie?.runtime ? `${movie.runtime} mins` : "TBA";
  const budgetLabel = movie?.budget ? `$${movie.budget.toLocaleString()}` : "TBA";
  const revenueLabel = movie?.revenue ? `$${movie.revenue.toLocaleString()}` : "TBA";

  if (loading) {
    return (
      <div style={{
        minHeight: "100vh", minWidth: "200vh", backgroundColor: "black",
        paddingTop: "200px", paddingLeft: "330px", height: "500px", width: "800px"
      }}>
        <img src="https://cdn.dribbble.com/users/29051/screenshots/1671982/loading-anim-dribbble.gif"
          style={{ paddingLeft: "150px", height: "500px", width: "800px" }} />
        <p style={{ color: "white", fontSize: "40px", marginLeft: "20%" }}>loading...</p>
      </div>
    );
  }

  if (!movie) {
    return (
      <div style={{ minHeight: "100vh", backgroundColor: "black", color: "white", padding: "80px 40px" }}>
        <h1>Movie details not found.</h1>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "black", color: "white", marginBottom: "0px" }}>
      <div>
        <img src={movie.img2} alt={movie.title}
          style={{ width: "100%", height: "auto" }} />
        <div>
          <img className="image" src={movie.poster_path} style={{
            height: "400px", width: "300px", position: "absolute", left: "70%", top: "45%",
            boxShadow: "20px"
          }} alt={movie.title} />
        </div>
        <div style={{
          marginLeft: "3%", paddingBottom: "4px", width: "60%", fontSize: "20px"
        }}>
          <h1>{movie.title}</h1>
          <p style={{ color: "gray" }}>{movie.overview}</p>
          <p>Rating: {ratingLabel}</p>
          <p>Director: {movie.director}</p>
          Cast:
          <ul>
            {castList.map((actor, index) => (
              <li key={index}>{actor}</li>
            ))}
          </ul>
          <p>Release Date: {`${new Date(movie.release_date).toLocaleString('default', { month: 'long' })} ${new Date(movie.release_date).getFullYear()}`}</p>
          <p>Runtime: {runtimeLabel}</p>
          <p>Budget: {budgetLabel}</p>
          <p>Revenue: {revenueLabel}</p>
          {movie.officialUrl ? (
            <p>
              Official Page: <a href={movie.officialUrl} target="_blank" rel="noreferrer" style={{ color: "#ff9ca1" }}>
                Marvel.com
              </a>
            </p>
          ) : null}
        </div>
      </div>
      {movie.trailer ? <Trailer link={movie.trailer} /> : null}
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {movie.music ? <Music link={movie.music} /> : null}
        {movie.isLocal ? (
          <Related relatedMovies={localRelatedMovies} />
        ) : (
          <Related movieId={movie._id} />
        )}
      </div>
    </div>
  );
}
