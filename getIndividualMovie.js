// Function to fetch movie details from OMDB API using the IMDB ID
const key = "57b04634";
export async function getMovieDetails(imdbID) {
  try {
    // Fetch movie details from OMDB API
    const response = await fetch(
      `http://www.omdbapi.com/?apikey=${key}&i=${imdbID}`
    );

    // Check if the response is successful
    if (!response.ok) {
      // Throw an error if response is not ok
      throw new Error("Something went wrong while fetching!");
    }

    // Parse response data as JSON
    const data = await response.json();

    // Return the parsed data
    return data;
  } catch (error) {
    // Log any errors to the console
    console.log(error);

    // Return null if there's an error
    return null;
  }
}
