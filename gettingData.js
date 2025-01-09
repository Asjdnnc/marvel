(async () => {
    const fetch = (await import("node-fetch")).default;
const apiKey = "2d47ff9ffd09afed42bf4742600998c8";
const movies = [
  "Iron Man",
  "The Incredible Hulk",
  "Iron Man 2",
  "Thor",
  "Captain America: The First Avenger",
  "The Avengers",
  "Iron Man 3",
  "Thor: The Dark World",
  "Captain America: The Winter Soldier",
  "Guardians of the Galaxy",
  "Avengers: Age of Ultron",
  "Ant-Man",
  "Captain America: Civil War",
  "Doctor Strange",
  "Guardians of the Galaxy Vol. 2",
  "Spider-Man: Homecoming",
  "Thor: Ragnarok",
  "Black Panther",
  "Avengers: Infinity War",
  "Ant-Man and the Wasp",
  "Captain Marvel",
  "Avengers: Endgame",
  "Spider-Man: Far From Home",
  "Black Widow",
  "Shang-Chi and the Legend of the Ten Rings",
  "Eternals",
  "Spider-Man: No Way Home",
  "Doctor Strange in the Multiverse of Madness",
  "Thor: Love and Thunder",
  "Black Panther: Wakanda Forever",
  "Ant-Man and the Wasp: Quantumania",
  "Guardians of the Galaxy Vol. 3"
];

async function fetchMovieId(movie) {
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(movie)}`;
  const response = await fetch(url);
  const data = await response.json();
  return data.results[0]?.id;
}

async function fetchMovieDetails(movieId) {
  const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

async function fetchAndSaveMovies() {
const fs = require("fs");
  const movieDetails = [];
  for (const movie of movies) {
    try {
      const movieId = await fetchMovieId(movie);
      if (movieId) {
        const details = await fetchMovieDetails(movieId);
        movieDetails.push({
          title: details.title,
          release_date: details.release_date,
          overview: details.overview,
          poster_path: `https://image.tmdb.org/t/p/w500${details.poster_path}`,
          vote_average: details.vote_average,
          genres: details.genres.map((genre) => genre.name),
          runtime: details.runtime,
          budget: details.budget,
          revenue: details.revenue,
        });
      }
    } catch (error) {
      console.error(`Error fetching details for movie: ${movie}`, error);
    }
  }

  // Save to data.js file
  fs.writeFileSync(
    "data.js",
    `module.exports = ${JSON.stringify(movieDetails, null, 2)};`
  );
  console.log("Movie data saved to data.js");
}

await fetchAndSaveMovies();
})();
