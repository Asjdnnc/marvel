import { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import axios from "axios";
import "./MovieDetails.css";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch movies from the backend API
    axios
      .get("https://marvel-w8vq.onrender.com/api/movies") // backend API route
      .then((response) => {
        setMovies(response.data); // Store all movies in state
        setFilteredMovies(response.data); // Initialize 
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching movies:", err);
        setLoading(false);
      });
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter movies based on the search query
    const filtered = movies.filter((movie) =>
      movie.title.toLowerCase().includes(query)
    );
    setFilteredMovies(filtered);
  };

  return (
    <div style={{ backgroundColor: "black", paddingBottom: "20px", minHeight: "110vh" }}>
      {/* Search Bar */}
      <div style={{ textAlign: "center", padding: "10px", color: "white", marginBottom: "10px" }}>
        <span style={{ fontSize: "80px", margin: "20px", color: "#e62429" }}>Marvel Movies</span><br /><br />
        <span>Discover the Marvel Cinematic Universe</span><br /><br />
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
            marginBottom: "20px"
          }}
        />
        <i className="fa-solid fa-magnifying-glass"></i>
      </div>

      {/* Movies List */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "20px",
          marginLeft: "10px",
          marginRight: "10px",
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
                width: "800px"
              }}
            />
            <p style={{ color: "white", fontSize: "60px", marginLeft: "90%" }}>loading...</p>
          </div>
        ) : (
          filteredMovies.length > 0 ? (
            filteredMovies.map((movie) => (
              <a
                className="image2"
                href={`/movies/${movie._id}`}
                key={movie._id}
                style={{
                  border: "1px solid grey",
                  borderRadius: "15px",
                  padding: "10px",
                  backgroundColor: "#151515",
                  color: "white",
                  textDecoration: "none",
                  transition: "transform 0.3s ease"
                }}
              >
                <img
                  src={movie.poster_path}
                  alt={movie.title}
                  style={{
                    width: "100%",
                    height: "350px",
                    objectFit: "fill",
                    opacity: "1",
                    borderRadius: "15px",
                  }}
                />
                <p className="text" style={{ fontSize: "21px" }}>{movie.title}</p>
                <p className="text" style={{ color: "lightgrey" }}>
                  {`${new Date(movie.release_date).toLocaleString('default', { month: 'long' })} ${new Date(movie.release_date).getFullYear()}`}
                </p>
              </a>
            ))
          ) : (
            <>
              <p style={{ color: "white", fontSize: "30px" }}>No movies found.</p>
              <p style={{ color: "white", fontSize: "30px" }}>Search the movie in <b>OTHERS</b> section</p>
            </>
          )
        )}
      </div>
    </div>
  );
}
