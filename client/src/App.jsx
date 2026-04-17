import React from 'react'
import { useState } from 'react'
import MovieCard from './MovieCard';
import SearchBar from './SearchBar';

const App = () => {

  const [title, setTitle] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);;

  const searchMovies = async () => {
    if (!title)
      return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:3001/search?title=${title}`);
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

  return (
    <div className="container">
      <h1>Movie Search</h1>

      <SearchBar
        title={title}
        onTitleChange={setTitle}
        onSearch={searchMovies}
      />

      {/* {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>} */}

      <div className="grid">
        {movies.map((movie) => (
          <MovieCard
            key={movie.imdbID}
            title={movie.Title}
            year={movie.Year}
            poster={movie.Poster}
          />
        ))}
      </div>
    </div>
  )
}

export default App
