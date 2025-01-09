const express = require("express");
const { getMovies, getMovieById,relatedMovie,} = require("../controllers/movieController");

const router = express.Router();

router.get("/", getMovies); // Get all movies
router.get('/:id/related',relatedMovie) //get realted movie
router.get("/:id", getMovieById); // Get movie by ID

module.exports = router;
