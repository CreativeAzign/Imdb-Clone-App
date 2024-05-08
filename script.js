//necessary imports
import { fetchResults, buildResults } from "./fetch_results.js";
import { clickHandler } from "./clickHandler.js";
import { displaySuggestions } from "./autosuggestions.js";

//fetch necessary html elements
const searchGlassDivElement = document.querySelector("#search-glass");
const searchDivElement = document.querySelector("#search");
export const searchInputDivElement = document.querySelector("#search-input");
const searchIconDivElement = document.querySelector("#search-icon");
const searchResultsHolderDivElement = document.querySelector(
  "#search_results_parent_holder"
);
const defaultBackgroundDivElement = document.querySelector(
  "#default-background"
);
const searchInDropDownDivElement = document.querySelector(
  "#search-in-dropdown"
);
export const suggestionsList = document.getElementById("suggestions");

displayDefaultBackground();
displayPreviousResults();

function displayDefaultBackground() {
  // Check if the background has been displayed before
  const hasDisplayedBefore = sessionStorage.getItem("hasDisplayedBefore");

  // If it hasn't been displayed before, display it
  if (hasDisplayedBefore !== "true") {
    defaultBackgroundDivElement.style.display = "block";
    // Set sessionStorage to indicate that the background has been displayed
    sessionStorage.setItem("hasDisplayedBefore", "true");
  } else {
    // If it has been displayed before, hide it
    defaultBackgroundDivElement.style.display = "none";
  }
}

// function to display previous search results while coming back from movie.html or favorites.html instead of blank
function displayPreviousResults() {
  const previousSearchResults =
    JSON.parse(sessionStorage.getItem("searchResults")) || [];
  if (previousSearchResults && previousSearchResults.length > 0) {
    previousSearchResults.forEach((movie) => {
      buildResults(movie, searchResultsHolderDivElement);
    });
  }
}

//event listener for search glass in nav-bar
searchGlassDivElement.addEventListener("click", () => {
  defaultBackgroundDivElement.style.display = "none";
  searchDivElement.style.display = "block";
});

//event listener for search option in nav-drop-down
searchInDropDownDivElement.addEventListener("click", () => {
  defaultBackgroundDivElement.style.display = "none";
  searchDivElement.style.display = "block";
});

//event listener for entering(or submission) in search input textbox
searchInputDivElement.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    fetchResults(searchInputDivElement.value, searchResultsHolderDivElement);
    searchInputDivElement.value = "";
    searchResultsHolderDivElement.innerHTML = "";
  }
});

//event listener for click(or submission) in search input textbox
searchIconDivElement.addEventListener("click", () => {
  fetchResults(searchInputDivElement.value, searchResultsHolderDivElement);
  searchInputDivElement.value = "";
  searchResultsHolderDivElement.innerHTML = "";
});

// Attach click event listener to the parent element(entire search results holder div) to deal with favorites or movie detail.
searchResultsHolderDivElement.addEventListener("click", clickHandler);

// Event listener for input changes
searchInputDivElement.addEventListener("input", displaySuggestions);

// Event listener for the "Favorites" link in the header on the index.html page
const favouritesLink = document.querySelector('a[href="favourites.html"]');
favouritesLink.addEventListener("click", displayFavourites);
