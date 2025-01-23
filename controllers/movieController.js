const Movie = require("../models/Movie");

// Get all movies
const getMovies = async (req, res) => {
  try {
    const movies = await Movie.find().sort({ watchOrder: -1 });
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch movies", error });
  }
};

// Get movie by ID
const getMovieById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("search for movie id",id);
    const movie = await Movie.findById(id);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.json(movie);
  } catch (error) {
    console.error("Error fetching movie:", error); // Log error
    res.status(500).json({ message: "Failed to fetch movie", error });
  }
};

// Add a new movie
const addMovie = async (req, res) => {
  try {
    const newMovie = new Movie(req.body);
    const savedMovie = await newMovie.save();
    res.status(201).json(savedMovie);
  } catch (error) {
    res.status(500).json({ message: "Failed to add movie", error });
  }
};
  //to get related movie
  const relatedMovie =  async (req, res) => {
  try {
    const movieId = req.params.id;
    const movie = await Movie.findById(movieId);
    // Ensure movie exists
    if (!movie) {
      return res.status(404).send('Movie not found');
    }
    const relatedMovies = await Movie.find({
      watchOrder: { $gte: movie.watchOrder - 2, $lte: movie.watchOrder + 2 },
      _id: { $ne: movieId }, // Exclude the current movie
    }).limit(3);
    res.json(relatedMovies);
  } catch (error) {
    console.error('Error fetching related movies:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { getMovies, getMovieById,relatedMovie, addMovie };
