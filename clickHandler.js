import { addToFavorites } from "./addToFavorites.js";

export const clickHandler = (event) => {
  // if the fav button is clicked, handled with addToFavorites
  if (
    event.target.classList.contains("btn") ||
    event.target.parentNode.classList.contains("btn")
  ) {
    // Change background color of the clicked heart icon
    event.target.closest(".btn").style.background = "red";
    const imdbID = event.target.closest(".btn").dataset.imdbid;
    addToFavorites(imdbID);
  }
  //movie card clicked anywhere other than fav-button,handled with calling movies.html page
  else if (!event.target.classList.contains("btn")) {
    const imdbID = event.target.closest(".card").dataset.imdbid;
    window.location.href = "movie.html?id=" + imdbID;
  }
};
