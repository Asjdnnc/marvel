import React from 'react';
import "./Trailer.css";
export default function MovieCard({ movie }) {
  return (
    <a className="card" href={`/movies/${movie._id}`}>
      <img
        src={movie.poster_path}
        alt={movie.title}
        style={{ width: "100%", height: "250px", borderRadius: "8px" }}
      />
      <h3 style={{ marginTop: "10px" }}>{movie.title}</h3>
      <p style={{color:"grey"}}>{`${new Date(movie.release_date).toLocaleString('default', { month: 'long' })} ${new Date(movie.release_date).getFullYear()}`}
      </p>
    </a>
  );
}
