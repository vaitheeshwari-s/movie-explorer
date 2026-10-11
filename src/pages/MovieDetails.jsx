
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getMovieDetails } from "../services/movieApi";
import Loader from "../components/Loader";

const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";
const BACKDROP_BASE = "https://image.tmdb.org/t/p/w1280";

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    setLoading(true);
    setError("");
    setMovie(null);

    getMovieDetails(id)
      .then((data) => {
        if (active) setMovie(data);
      })
      .catch(() => {
        if (active) setError("Could not load movie details.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [id]);

  if (loading) return <Loader />;

  if (error || !movie) {
    return <main className="container">
      <p className="message error">{error || "Movie not found."}</p>
      <Link to="/">← Back to movies</Link>
    </main>;
  }

  const backdrop = movie.backdrop_path
    ? `${BACKDROP_BASE}${movie.backdrop_path}`
    : "";

  return (
    <main className="container details-page">
      <Link to="/" className="back-link">← Back to movies</Link>

      {backdrop && (
        <img
          className="backdrop"
          src={backdrop}
          alt=""
        />
      )}

      <div className="details-layout">
        {movie.poster_path && (
          <img
            className="details-poster"
            src={`${IMAGE_BASE}${movie.poster_path}`}
            alt={movie.title}
          />
        )}

        <section>
          <p className="eyebrow">MOVIE DETAILS</p>
          <h1>{movie.title}</h1>

          <p>
            ⭐ {Number(movie.vote_average || 0).toFixed(1)} / 10
            {" · "}
            {movie.release_date || "Release date unavailable"}
            {" · "}
            {movie.runtime ? `${movie.runtime} min` : "Runtime unavailable"}
          </p>

          <div className="genre-list">
            {movie.genres?.map((item) => (
              <span className="genre-tag" key={item.id}>
                {item.name}
              </span>
            ))}
          </div>

          <h2>Overview</h2>
          <p className="overview">
            {movie.overview || "No overview available."}
          </p>

          <p><strong>Language:</strong> {movie.original_language?.toUpperCase()}</p>
          <p><strong>Status:</strong> {movie.status}</p>
        </section>
      </div>
    </main>
  );
}
