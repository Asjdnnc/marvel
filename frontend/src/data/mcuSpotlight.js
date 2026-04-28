import { latestCatalogMovies } from "./movieCatalog";

export const postDeadpoolTimelineEntries = latestCatalogMovies;

const doomsdayMovie = latestCatalogMovies.find(
  (movie) => movie.title === "Avengers: Doomsday"
);

export const nextMcuRelease = {
  title: doomsdayMovie?.title || "Avengers: Doomsday",
  releaseDate: doomsdayMovie?.release_date || "2026-12-16",
  badge: "Marvel next release",
  description:
    "TMDB currently lists Avengers: Doomsday as the next major MCU movie on the theatrical calendar.",
  poster: doomsdayMovie?.poster_path || "",
  officialUrl: "https://www.marvel.com/movies/avengers-doomsday",
};

export const supplementalHomeMovies = latestCatalogMovies;
