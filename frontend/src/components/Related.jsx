import MovieCard from "./MovieCard"
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Related({ movieId, relatedMovies: localRelatedMovies }) {
  const [relatedMovies, setRelatedMovies] = useState([]);
  useEffect(() => {
    if (localRelatedMovies) {
      setRelatedMovies(localRelatedMovies);
      return;
    }

    axios.get(`https://marvel-w8vq.onrender.com/api/movies/${movieId}/related`)
      .then(response => {
        setRelatedMovies(response.data);
      })
      .catch(error => console.error('Error fetching related movies:', error));
  }, [movieId, localRelatedMovies]);
  return(
    <div style={{marginLeft:"4%"}}>
         <h1 style={{marginLeft:"5%",fontSize:"35px"}}>Related Movies</h1>
         <div style={{ display: "flex"}}>
        {relatedMovies.map((movie) => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
