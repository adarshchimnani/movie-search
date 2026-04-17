export default function SearchBar({ title, onTitleChange, onSearch }) {
    return (
        <div className='search-bar'>
            <input
                type="text"
                placeholder="Enter movie title..."
                value={title}
                onChange={(e) => onTitleChange(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && onSearch()}
            />
            <button onClick={onSearch}>Search</button>
        </div>
    )

}