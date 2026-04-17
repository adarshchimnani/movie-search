import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function MovieDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const response = await fetch(`http://localhost:3001/movie/${id}`)
                const data = await response.json();
                setMovie(data);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        }
           fetchMovie();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (!movie) return <p>Movie not found.</p>;

    return (
        <div className="detail">
            <button onClick={() => navigate(-1)}>Back</button>
            <div className="detail-content">
                <img src={movie.Poster !== 'N/A' ? movie.Poster : 'http://via.placeholder.com/300x450?text=No+Image'} />

                <div className="detail-info">
                    <h2>{movie.Title} ({movie.Year})</h2>
                    <p><strong>Genre:</strong> {movie.Genre}</p>
                    <p><strong>Director:</strong> {movie.Director}</p>
                    <p><strong>Actors:</strong> {movie.Actors}</p>
                    <p><strong>Plot:</strong> {movie.Plot}</p>
                    <p><strong>IMDB Rating:</strong> {movie.imdbRating}</p>
                </div>
            </div>
        </div>
    )
}