
import { Link } from "react-router-dom";

const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

export default function MovieCard({ movie }) {
  const poster = movie.poster_path
    ? `${IMAGE_BASE}${movie.poster_path}`
    : null;

  return (
    <Link to={`/movie/${movie.id}`} className="movie-card">
      {poster ? (
        <img src={poster} alt={movie.title} loading="lazy" />
      ) : (
        <div className="no-poster">No poster available</div>
      )}

      <div className="movie-info">
        <h3>{movie.title}</h3>
        <p>
          ⭐ {Number(movie.vote_average || 0).toFixed(1)}
          {" · "}
          {movie.release_date?.slice(0, 4) || "Year unknown"}
        </p>
      </div>
    </Link>
  );
}
