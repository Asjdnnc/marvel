const express = require("express");
const { getMovies, getMovieById,relatedMovie, addMovie} = require("../controllers/movieController");

const router = express.Router();

router.get("/", getMovies); // Get all movies
router.get("/:id", getMovieById); // Get movie by ID
router.get('/api/movies/:id/related',relatedMovie) //get realted movie
router.post("/add", addMovie); //to add movie to database
module.exports = router;
