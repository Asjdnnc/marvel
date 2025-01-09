import React from 'react';
export default function MovieCard({ movie }) {
  return (
    <div style={{ width: "200px", backgroundColor: "#1c1c1c",marginLeft:"40px", padding: "20px", borderRadius: "8px", color: "white" }}>
      <img
        src={movie.poster_path}
        alt={movie.title}
        style={{ width: "100%", height: "250px", borderRadius: "8px" }}
      />
      <h3 style={{ marginTop: "10px" }}>{movie.title}</h3>
      <p style={{color:"grey"}}>{`${new Date(movie.release_date).toLocaleString('default', { month: 'long' })} ${new Date(movie.release_date).getFullYear()}`}
      </p>
    </div>
  );
}
