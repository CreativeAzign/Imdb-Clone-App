import { getMovieDetails } from "./getIndividualMovie.js";

// Function to add a movie to favorites by its IMDB ID
export async function addToFavorites(imdbID) {
  // Fetch movie details using the provided IMDB ID
  const movie = await getMovieDetails(imdbID);

  // Check if movie details were successfully retrieved
  if (movie) {
    // Retrieve the list of favorite movies from localStorage
    const favMoviesList = JSON.parse(localStorage.getItem("favorites")) || [];

    // Check if the movie is not already in the favorites list
    if (!favMoviesList.some((m) => m.imdbID === movie.imdbID)) {
      // Add the movie to the favorites list
      favMoviesList.push(movie);

      // Save the updated favorites list to localStorage
      localStorage.setItem("favorites", JSON.stringify(favMoviesList));

      // Show a success message
      alert(`${movie.Title} added to favorites!`);
    } else {
      // Show a message if the movie is already in favorites
      alert(`${movie.Title} is already in favorites!`);
    }
  }
}
