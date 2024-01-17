document.addEventListener("DOMContentLoaded", () => {
  const apiKey = "18f89bc934c16b2d711b9da77eef4831";
  const apiUrlRandom = "https://api.themoviedb.org/3/discover/movie";
  const apiUrlSearch = "https://api.themoviedb.org/3/search/movie";
  const baseImageUrl = "https://image.tmdb.org/t/p/w300";
  const appElement = document.getElementById("app");
  const searchInput = document.getElementById("search-input");
  const searchButton = document.getElementById("search-button");

  const fetchMovies = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error("Error fetching movies:", error);
      return [];
    }
  };

  const createMovieCard = (movie) => {
    const movieCardElement = document.createElement("div");
    movieCardElement.className = "movie-card";

    const posterElement = document.createElement("img");
    posterElement.src = `${baseImageUrl}${movie.poster_path}`;
    posterElement.alt = movie.title;

    const titleElement = document.createElement("h3");
    titleElement.textContent = movie.title;

    const detailsElement = document.createElement("div");
    detailsElement.className = "movie-details";

    const genreElement = document.createElement("p");
    genreElement.textContent = `Genre: ${getGenres(movie.genre_ids).join(
      ", "
    )}`;

    const overviewElement = document.createElement("p");
    overviewElement.textContent = `Overview: ${movie.overview}`;

    const imdbElement = document.createElement("p");
    imdbElement.textContent = `IMDb: ${movie.vote_average}`;

    const yearElement = document.createElement("p");
    yearElement.textContent = `Year: ${getReleaseYear(movie.release_date)}`;

    const watchButton = document.createElement("button");
    watchButton.textContent = "Watch";
    watchButton.className = "watch-button";
    detailsElement.appendChild(genreElement);
    detailsElement.appendChild(overviewElement);
    detailsElement.appendChild(imdbElement);
    detailsElement.appendChild(yearElement);
    movieCardElement.appendChild(posterElement);
    movieCardElement.appendChild(titleElement);
    movieCardElement.appendChild(detailsElement);
    movieCardElement.appendChild(watchButton);
    return movieCardElement;
  };

  const renderMovies = (movies) => {
    appElement.innerHTML = "";
    for (let i = 0; i < movies.length; i += 4) {
      const rowMovies = movies.slice(i, i + 4);
      rowMovies.forEach((movie) => {
        const movieCardElement = createMovieCard(movie);
        appElement.appendChild(movieCardElement);
      });
    }
  };

  const getGenres = (genreIds) => {
    const genreNames = {
      28: "Action",
      12: "Adventure",
      16: "Animation",
      35: "Comedy",
      80: "Crime",
      99: "Documentary",
      18: "Drama",
      10751: "Family",
      14: "Fantasy",
      36: "History",
      27: "Horror",
      10402: "Music",
      9648: "Mystery",
      10749: "Romance",
      878: "Science Fiction",
      10770: "TV Movie",
      53: "Thriller",
      10752: "War",
      37: "Western",
    };

    const filteredGenres = genreIds.map((id) => genreNames[id]).filter(Boolean);
    return filteredGenres.length > 0 ? filteredGenres : ["Unknown"];
  };

  const getReleaseYear = (releaseDate) => {
    return releaseDate ? new Date(releaseDate).getFullYear() : "Unknown";
  };

  const handleSearch = async () => {
    const query = searchInput.value.trim();
    const url =
      query !== ""
        ? `${apiUrlSearch}?api_key=${apiKey}&query=${query}`
        : `${apiUrlRandom}?api_key=${apiKey}`;

    try {
      const moviesData = await fetchMovies(url);
      renderMovies(moviesData);
    } catch (error) {
      console.error("Error handling search:", error);
    } finally {
      searchInput.value = "";
    }
  };

  searchButton.addEventListener("click", handleSearch);
  searchInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  });

  handleSearch();
});

document.addEventListener("DOMContentLoaded", function () {
  let currentSlide = 1;

  function showSlide(slideNumber) {
    const slides = document.querySelectorAll(".slide");
    slides.forEach((slide) => (slide.style.display = "none"));
    document.getElementById(`slide${slideNumber}`).style.display = "block";
  }

  function nextSlide() {
    currentSlide = (currentSlide % 4) + 1;
    showSlide(currentSlide);
  }

  showSlide(currentSlide);
  setInterval(nextSlide, 5000);
});
