
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import "./index.css";

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="brand">CINEVERSE<span>.</span></Link>
      <Link to="/">Discover</Link>
    </nav>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="*" element={<main className="container">
          <h1>Page not found</h1>
          <Link to="/">Return home</Link>
        </main>} />
      </Routes>
      <footer className="footer">
        <p>This product uses the TMDB API but is not endorsed or certified by TMDB.</p>
      </footer>
    </BrowserRouter>
  );
}
