import { getMovieDetails } from "./getIndividualMovie.js";

//fetch movie holder html element
const moviePlotDivElement = document.querySelector("#movie-plot");

// Retrieve the IMDb ID from the URL query parameters
const urlParams = new URLSearchParams(window.location.search);
const imdbID = urlParams.get("id");

// Call the function to display movie details using the retrieved IMDb ID
displayMovieInfo(imdbID);

export async function displayMovieInfo(imdbID) {
  const movie = await getMovieDetails(imdbID);
  console.log(movie);
  //movie runtime in minutes fetched from api is converted to hour and minutes to display in movie card
  const totalMinutes = parseInt(movie.Runtime);
  const runningHours = Math.floor(totalMinutes / 60); // Get the whole number of hours
  const runningMinutes = totalMinutes % 60; // Get the remaining minutes

  // preparation of movie card element and appending to movie holder
  if (movie) {
    const movieInfoHolderDivElement =
      document.querySelector("#movie-info-holder");
    movieInfoHolderDivElement.innerHTML = `<div class="card mb-3 mt-5 w-100 bg-dark h-70"  style = "background-image: linear-gradient(to bottom right, #ffd700, #ff7e5f, #feb47b);">
         <div class="row g-0">
           <div class="col-md-4">
             <img src=${movie.Poster} class="img-fluid rounded-start h-100" alt="...">
           </div>
           <div class="col-md-8">
             <div class="card-body">
               <h5 class="card-title text-dark fs-1">${movie.Title}</h5>
               
               <p class="card-text text-dark">Directed By: ${movie.Director}</p>
               <p class="card-text text-dark">StoryWritten By: ${movie.Writer}</p>
               <p class="card-text text-dark">Actors: ${movie.Actors}</p>
               <p class="card-text text-dark">Released Date: ${movie.Released}</p>
               <p class="card-text text-dark">Original Language: ${movie.Language}</p>
               <p class="card-text text-dark">Genre: ${movie.Genre}</p>
               <p class="card-text text-dark">IMDB Rating: ${movie.imdbRating}</p>
               <p class="card-text text-dark">Length: ${runningHours}hrs and ${runningMinutes}minutes</p>
               <button type="button" class="btn btn-danger" style="width: 100px;"><b>PLAY</b></button>
             </div>
           </div>
         </div>
       </div>`;

    // movie plot added
    moviePlotDivElement.innerHTML = `${movie.Plot}`;
  }
}
