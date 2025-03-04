import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./MovieDetails.css";
import "../components/Trailer.css";
import Trailer from "../components/Trailer";
import Music from "../components/Music";
import Related from "../components/Related";
import axios from "axios";

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("movie called");
    axios.get(`https://marvel-w8vq.onrender.com/api/movies/${id}`).then((response) => {
      setMovie(response.data);
      setLoading(false);
    }).catch((err) => { console.error("Error fetching movie details:", err); });
  }, [id]);

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
          <p>Rating: {movie.vote_average} <i className="fa-solid fa-star" style={{ color: "#e8b10c" }}></i></p>
          <p>Director: {movie.director}</p>
          Cast:
          <ul>
            {movie.cast[0].map((actor, index) => (
              <li key={index}>{actor}</li>
            ))}
          </ul>
          <p>Release Date: {`${new Date(movie.release_date).toLocaleString('default', { month: 'long' })} ${new Date(movie.release_date).getFullYear()}`}</p>
          <p>Runtime: {movie.runtime} mins</p>
          <p>Budget: ${movie.budget.toLocaleString()}</p>
          <p>Revenue: ${movie.revenue.toLocaleString()}</p>
        </div>
      </div>
      <Trailer link={movie.trailer} />
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <Music link={movie.music} />
        <Related movieId={movie._id} />
      </div>
    </div>
  );
}
