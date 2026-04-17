import React, { use } from 'react'
import { useState, useEffect, useRef } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import MovieCard from './MovieCard';
import MovieDetail from './pages/MovieDetail';
import SearchBar from './SearchBar';

const App = () => {

  const [title, setTitle] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const searchMovies = async (query) => {
    const searchTerm = query || title;

    if (!searchTerm)
      return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:3001/search?title=${searchTerm}`);
      const data = await response.json();

      if (data.Response === "True") {
        setMovies(data.Search);
      } else {
        setError(data.Error);
        setMovies([]);
      }
    } catch (err) {
      setError('An error occurred while searching for movies.');
      setMovies([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    searchMovies("Batman");
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const home = (
    <div className="container">
      <h1>Movie Search</h1>

      <SearchBar
        title={title}
        onTitleChange={setTitle}
        onSearch={searchMovies}
        inputRef={inputRef}
      />

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      <div className="grid">
        {movies.map((movie) => (
          <MovieCard
            key={movie.imdbID}
            title={movie.Title}
            year={movie.Year}
            poster={movie.Poster}
            onClick={() => navigate(`/movie/${movie.imdbID}`)}
          />
        ))}
      </div>
    </div>
  )

  return (
    <Routes>
      <Route path="/" element={home} />
      <Route path="/movie/:id" element={<MovieDetail />} />
    </Routes>
  )
}

export default App
