export default function SearchBar({ title, onTitleChange, onSearch, inputRef }) {
    return (
        <div className='search-bar'>
            <input
                ref={inputRef}
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