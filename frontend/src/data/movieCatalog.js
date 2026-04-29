import latestMovieCatalogData from "./movieCatalogData";

const localMovieCatalog = latestMovieCatalogData.map((movie) => ({
  ...movie,
  _id: movie._id || `local-${movie.watchOrder}`,
  isLocal: true,
}));

export default localMovieCatalog;

export const latestCatalogMovies = localMovieCatalog;

export function getLocalMovieById(id) {
  return localMovieCatalog.find((movie) => movie._id === id) || null;
}

export function getLocalRelatedMovies(movie) {
  return localMovieCatalog
    .filter(
      (candidateMovie) =>
        candidateMovie.watchOrder !== movie.watchOrder &&
        candidateMovie.watchOrder >= movie.watchOrder - 2 &&
        candidateMovie.watchOrder <= movie.watchOrder + 2
    )
    .slice(0, 3);
}
