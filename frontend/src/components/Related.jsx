import MovieCard from "./MovieCard"
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Related({ movieId }) {
  const [relatedMovies, setRelatedMovies] = useState([]);
  useEffect(() => {
    axios.get(`http://localhost:8080/api/movies/${movieId}/related`)
      .then(response => {
        setRelatedMovies(response.data);
      })
      .catch(error => console.error('Error fetching related movies:', error));
  }, [movieId]);
  return(
    <div style={{marginLeft:"4%"}}>
         <h1 style={{marginLeft:"5%",fontSize:"35px",textDecoration:"underline"}}>Related Movies</h1>
         <div style={{ display: "flex"}}>
        {relatedMovies.map((movie) => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </div>
    </div>
  );
}