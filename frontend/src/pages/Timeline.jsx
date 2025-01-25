import React, { useEffect, useState } from "react";
import axios from "axios";
import "./TimelineComp.css";

export default function Timeline() {
  const [movies, setMovies] = useState([]);
  const [loading,setloading] = useState(true);
  let titleCond = {
    1:"The Infinity Saga: Phase One (2008-2012)",
    7:"Phase Two (2013-2015)",
    13:"Phase Three (2016-2019)",
    24:"The Multiverse Saga: Phase Four (2021-2022)",
    32:"Phase Five (2023-2024)"
  }
  useEffect(() => {
    axios.get("https://marvel-w8vq.onrender.com/api/movies")
      .then((response) => {
        const sortedMovies = response.data.sort((a, b) => a.watchOrder - b.watchOrder);
        setMovies(sortedMovies);
        setloading(false);
      })
      .catch((error) => {console.error("Error fetching movies:", error);
      setloading(false);})
  }, []);

  return (
    <div style={{ backgroundColor: "black", color: "white" }}>
      <header style={{ textAlign: "center", padding: "20px" }}>
        <h1 style={{ fontSize: "55px"}}>Timeline for MCU</h1>
      </header>
      <p style={{ fontSize: "20px", color: "#666666",paddingLeft:"100px",paddingRight:"100px"}}>
      Watching the Marvel Cinematic Universe (MCU) movies in chronological 
        timeline order allows you to experience the story as it unfolds in the
        Marvel Universe itself, making the journey more immersive and emotionally
        impactful. The timeline connects the intricate arcs of iconic characters
        like Iron Man, Captain America, and Thor while weaving a cohesive 
        narrative across multiple franchises. Following the timeline helps
        you understand crucial events and relationships, such as the formation
        of the Avengers, the rise of Thanos, and the implications of the Infinity
        Stones, in the sequence they were meant to be experienced. This order
        provides deeper insights into character motivations and ensures
        that key plot twists and post-credit scenes align seamlessly,
        enhancing your appreciation of the interconnected storytelling that defines the MCU.
      </p>
      <section className="design-section">
        <div className="timeline">
          {loading?(
            <img src="https://cdn.dribbble.com/users/29051/screenshots/1671982/loading-anim-dribbble.gif" style={{paddingLeft:"140px",height:"500px",width:"800px"}}/>)
            :(movies.length > 0 ? (
            movies.map((movie, index) => (
            <div>
              <div className="title" >
              {movie.watchOrder in titleCond?
              <p>{titleCond[movie.watchOrder]}</p>:null}
              </div>
              <div
                className={`timeline-row ${index % 2 === 0 ? 'left' : 'right'}`}
                key={movie._id}
              >
                <div className="timeline-middle">
                <div className="timeline-circle">
                </div>
                </div>
                {index % 2 === 0 ? (
                  <>
                    <div className="timeline-details" style={{ width: "35%", marginRight: "10px" }}>
                      <p>{movie.overview}</p>
                    </div>
                    <div className="timeline-content" style={{ width: "21%", marginLeft: "18%" }}>
                      <a href={`/movies/${movie._id}`} style={{ textDecoration: "none", color: "white" }}>
                        <img
                          src={movie.poster_path}
                          style={{ width: "100%", height: "180px", borderRadius: "5px" }}
                          alt={`${movie.title} poster`}
                        />
                        <p className="text" style={{ fontSize: "21px", marginTop: "10px" }}>
                          {movie.title}
                        </p>
                        <p className="text" style={{ color: "lightgrey" }}>
                          {`${new Date(movie.release_date).toLocaleString("default", {
                            month: "long",
                          })} ${new Date(movie.release_date).getFullYear()}`}
                        </p>
                      </a>
                    </div>
                    <div className="details-right">
                      <ul className="list-right">
                        <li>{movie.vote_average} <i className="fa-solid fa-star" style={{color:"#e8b10c"}}></i></li>
                        <li>{movie.director}</li>
                        <li>{movie.runtime} mins</li>
                        <li>${movie.budget.toLocaleString()}</li>
                      </ul>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="left-content" style={{ display: "flex",justifyContent:"flex-start", width: "50%" }}>
                      <div className="details-left">
                        <ul className="list-left">
                          <li>{movie.vote_average} <i className="fa-solid fa-star" style={{color:"#e8b10c"}}></i></li>
                          <li>{movie.director}</li>
                          <li>{movie.runtime} mins</li>
                          <li>${movie.budget.toLocaleString()}</li>
                        </ul>
                      </div>
                      <div className="timeline-content" style={{ width: "100%", marginRight: "9%" }}>
                        <a href={`/movies/${movie._id}`} style={{ textDecoration: "none", color: "white" }}>
                          <img
                            src={movie.poster_path}
                            style={{ width: "100%", height: "180px", borderRadius: "5px" }}
                            alt={`${movie.title} poster`}
                          />
                          <p className="text" style={{ fontSize: "21px", marginTop: "10px" }}>
                            {movie.title}
                          </p>
                          <p className="text" style={{ color: "lightgrey" }}>
                            {`${new Date(movie.release_date).toLocaleString("default", {
                              month: "long",
                            })} ${new Date(movie.release_date).getFullYear()}`}
                          </p>
                        </a>
                      </div>
                    </div>
                    <div className="timeline-details" style={{ width: "35%",marginLeft:"18%" }} id={`details-${movie._id}`}>
                      <p>{movie.overview}</p>
                    </div>
                  </>
                )}
              </div>
              </div>
            ))
          ) : (
            <p style={{ textAlign: "center", color: "lightgrey", fontSize: "20px" }}>
              No movies found
            </p>
          ))}
        </div>
      </section>
    </div>
  );
}
