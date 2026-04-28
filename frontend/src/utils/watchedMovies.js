const WATCHED_MOVIES_KEY = "marvel-watched-movies";

export function readWatchedMovies() {
  if (typeof window === "undefined") {
    return {};
  }

  try {
    const storedValue = window.localStorage.getItem(WATCHED_MOVIES_KEY);
    return storedValue ? JSON.parse(storedValue) : {};
  } catch (error) {
    console.error("Error reading watched movie state:", error);
    return {};
  }
}

export function writeWatchedMovies(watchedMovies) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(
      WATCHED_MOVIES_KEY,
      JSON.stringify(watchedMovies)
    );
  } catch (error) {
    console.error("Error saving watched movie state:", error);
  }
}
