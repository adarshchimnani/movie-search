export default function MovieCard({ title, year, poster, onClick }) {
    return (
        <div className="card" onClick={onClick}>
            <img src={poster !== 'N/A' ? poster : 'http://via.placeholder.com/150x220?text=No+Image'}
                alt={title}
            />
            <h3>{title}</h3>
            <p>{year}</p>
        </div>
    )
}