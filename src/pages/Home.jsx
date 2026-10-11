
import { useEffect, useState } from "react";
import {
  getPopularMovies,
  searchMovies,
  getMovieGenres,
  getMoviesByGenre,
} from "../services/movieApi";
import MovieCard from "../components/MovieCard";
import Loader from "../components/Loader";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [query, setQuery] = useState("");
  const [genre, setGenre] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getMovieGenres()
      .then((data) => setGenres(data.genres || []))
      .catch(() => setError("Could not load genres."));
  }, []);

  useEffect(() => {
    let active = true;

    async function loadMovies() {
      setLoading(true);
      setError("");

      try {
        let data;

        if (query.trim()) {
          data = await searchMovies(query.trim());
        } else if (genre) {
          data = await getMoviesByGenre(genre);
        } else {
          data = await getPopularMovies();
        }

        if (active) setMovies(data.results || []);
      } catch (err) {
        if (active) {
          setError(err.message || "Unable to load movies.");
          setMovies([]);
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    const timer = setTimeout(loadMovies, query ? 400 : 0);

    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [query, genre]);

  return (
    <main className="container">
      <section className="hero">
        <p className="eyebrow">YOUR NEXT MOVIE STARTS HERE</p>
        <h1>Explore the world of cinema.</h1>
        <p>Discover popular movies, ratings and stories.</p>

        <input
          type="search"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setGenre("");
          }}
          aria-label="Search movies"
        />
      </section>

      <section className="catalog">
        <div className="section-heading">
          <h2>{query ? "Search Results" : "Discover Movies"}</h2>

          <select
            aria-label="Filter by genre"
            value={genre}
            onChange={(e) => {
              setGenre(e.target.value);
              setQuery("");
            }}
          >
            <option value="">All Genres</option>
            {genres.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        {loading ? (
          <Loader />
        ) : error ? (
          <p className="message error">{error}</p>
        ) : movies.length === 0 ? (
          <p className="message">No movies found. Try another search.</p>
        ) : (
          <div className="movie-grid">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
