
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

async function request(endpoint) {
  if (!API_KEY) {
    throw new Error("TMDB API key missing. Check your .env file.");
  }

  const separator = endpoint.includes("?") ? "&" : "?";
  const response = await fetch(
    `${BASE_URL}${endpoint}${separator}api_key=${API_KEY}`
  );

  if (!response.ok) {
    throw new Error(`Movie API error: ${response.status}`);
  }

  return response.json();
}

export function getPopularMovies() {
  return request("/movie/popular?language=en-US&page=1");
}

export function searchMovies(query) {
  return request(
    `/search/movie?query=${encodeURIComponent(query)}&language=en-US&page=1`
  );
}

export function getMovieDetails(id) {
  return request(`/movie/${id}?language=en-US`);
}

export function getMovieGenres() {
  return request("/genre/movie/list?language=en");
}

export function getMoviesByGenre(genreId) {
  return request(
    `/discover/movie?with_genres=${genreId}&language=en-US&page=1`
  );
}
