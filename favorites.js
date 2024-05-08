const parentContainerDivElement = document.querySelector(
  "#favorites-container"
);
const favMoviesList = JSON.parse(localStorage.getItem("favorites")) || [];
// function to display favorites
function displayFavourites() {
  if (favMoviesList) {
    favMoviesList.forEach((movie) => {
      addToFavoritesSection(movie);
    });
  }
}

function addToFavoritesSection(movie) {
  // Extract movie details
  const imdbID = movie.imdbID;
  const title = movie.Title;
  const poster = movie.Poster;
  const director = movie.Director;

  // Create a card template for the movie
  const cardTemplate = `<div class="card m-5 bg-dark" style="width: 15vw; height: 50vh; background-image: linear-gradient(to top, #ffd700, #ff7e5f, #feb47b);" id="movie-card">
      <img src="${poster}" class="card-img-top w-100" alt="movie img" style="height: 30vh;">
      <div class="card-body">
        <h5 class="card-title text-light">${title}</h5>
        <p class="card-text text-light">${director}</p>
        <a href="#" class="btn btn-dark text-warning">REMOVE</a>
      </div>
    </div>`;

  // Create a new div element to hold the movie card
  const movieCard = document.createElement("div");
  movieCard.innerHTML = cardTemplate;

  // Add the movie card to the parent container
  parentContainerDivElement.appendChild(movieCard);

  // Add event listener to the remove button
  const removeBtn = movieCard.querySelector(".btn");
  removeBtn.addEventListener("click", () => {
    // Ask for confirmation before removing the movie
    confirm(`Are you sure you want to remove ${title} from Favorites?`);

    // Remove the movie card from the parent container
    parentContainerDivElement.removeChild(movieCard);

    // Remove the movie from the favorites list
    const toBeRemovedMovie = favMoviesList.find(
      (movie) => movie.imdbID === imdbID
    );
    if (toBeRemovedMovie) {
      const updatedFavList = favMoviesList.filter(
        (movie) => movie.imdbID !== imdbID
      );
      favMoviesList = updatedFavList;
    }
  });
}

// Automatically display favorites when the favourites.html page is loaded
document.addEventListener("DOMContentLoaded", () => {
  displayFavourites();
});
