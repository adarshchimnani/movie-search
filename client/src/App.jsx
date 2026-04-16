import React from 'react'
import { useState } from 'react'

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

      <div className='search-bar'>
        <input
          type="text"
          placeholder="Enter movie title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && searchMovies()}
        />
        <button onClick={searchMovies}>Search</button>
      </div>

      {/* {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>} */}

      <div className="grid">
        {movies.map((movie) => (
          <div key={movie.imdbID} className="movie-card">
            <img src={movie.Poster !== 'N/A' ? movie.Poster : 'http://via.placeholder.com/150x220?text=No+Image'}
              alt={movie.Title} />
            <h3>{movie.Title}</h3>
            <p>{movie.Year}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
