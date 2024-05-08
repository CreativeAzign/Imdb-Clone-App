const key = "57b04634";
export async function fetchResults(
  searchString,
  searchResultsHolderDivElement
) {
  try {
    const response = await fetch(
      `https://www.omdbapi.com/?apikey=${key}&s=${searchString}`
    );
    if (!response.ok) {
      throw new Error("somethin went wrong!!!");
    }
    const data = await response.json();
    console.log(data);
    console.log("the particular data:");
    // Accessing the 'Search' array
    const searchArray = data.Search;
    // Store the search results in LocalStorage
    sessionStorage.setItem("searchResults", JSON.stringify(searchArray));
    const noOfResults = searchArray.length;
    const resultsHeaderDivElement = document.querySelector("#results-header");
    resultsHeaderDivElement.innerHTML = `WE FOUND ${noOfResults} REALATED RESULTS:`;
    // Iterating over the 'Search' array and accessing each item
    searchArray.forEach((item) => {
      buildResults(item, searchResultsHolderDivElement);
    });
  } catch (error) {
    console.log(error);
  }
}

export function buildResults(data, searchResultsHolderDivElement) {
  // extract the movie details
  const poster = data.Poster;
  const title = data.Title;
  const released_year = data.Year;
  const type = data.Type;
  const imdbid = data.imdbID;

  const element = `<div class="card m-5" style="background-color: transparent; box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);" data-imdbid="${imdbid}">
  <div class="row g-0">
      <div class="col-md-4">
      <img src="${poster}" class="img-fluid rounded-start" alt="Movie image loading..." style="height: 170px; width: 170px;">
      </div>
      <div class="col-md-8">
      <div class="card-body" id="heart-part">
          <h5 class="card-title text-secondary">${title}</h5>
          <p class="card-text text-secondary">${released_year}</p>
          <button class="btn btn-outline-warning" id="fav-button" data-imdbid="${imdbid}"> <i id="heart-icon" class="far fa-heart fs-3 text-warning"></i></button> 
      </div>
      </div>
  </div>
  </div>`;
  // Create a temporary container element
  const tempContainer = document.createElement("div");

  // Set the innerHTML of the container to the element string
  tempContainer.innerHTML = element;
  //append it to the parent
  searchResultsHolderDivElement.appendChild(tempContainer);
}
