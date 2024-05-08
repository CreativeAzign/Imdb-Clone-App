import { suggestionsList, searchInputDivElement } from "./script.js";

// Function to display movie suggestions
export async function displaySuggestions() {
  const query = searchInputDivElement.value.trim();
  if (query.length === 0) {
    suggestionsList.innerHTML = ""; // Clear suggestions if query is empty
    return;
  }

  const suggestions = await fetchMovieSuggestions(query);
  const html = suggestions.map((movie) => `<li>${movie.Title}</li>`).join("");
  suggestionsList.innerHTML = html;

  // Add event listeners to suggestions for selecting a movie
  suggestionsList.querySelectorAll("li").forEach((suggestion) => {
    suggestion.addEventListener("click", () => {
      searchInputDivElement.value = suggestion.textContent;
      suggestionsList.innerHTML = ""; // Clear suggestions
    });
  });
}

// Auto Suggestions functionality
// Function to fetch movie suggestions from OMDB API
async function fetchMovieSuggestions(query) {
  const response = await fetch(
    `https://www.omdbapi.com/?apikey=57b04634&s=${query}`
  );
  const data = await response.json();
  return data.Search || [];
}
