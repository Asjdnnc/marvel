const express = require("express");
const { getMovies, getMovieById,relatedMovie, addMovie} = require("../controllers/movieController");

const router = express.Router();

router.get("/", getMovies); // Get all movies
router.post("/add", addMovie); //to add movie to database
router.get('/api/movies/:id/related',relatedMovie) //get realted movie
router.get("/api/movies/:id", getMovieById); // Get movie by ID
module.exports = router;
