
import { useEffect, useRef, useState } from 'react';
import './EventSearch.css';

function EventSearch({ searchTerm, onSearchChange }) {
  const [inputValue, setInputValue] = useState(searchTerm);

  // Create a reference to the search input
  const inputRef = useRef(null);

  useEffect(() => {
    setInputValue(searchTerm);
  }, [searchTerm]);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearchChange(inputValue);
    }, 400);

    return () => {
      clearTimeout(timer);
    };
  }, [inputValue, onSearchChange]);

  // Focus the search input
  const handleFocusSearch = () => {
    inputRef.current.focus();
  };

  return (
    <div className="event-search">
      <span className="search-icon" aria-hidden="true">
        🔍
      </span>

      <input
        ref={inputRef}
        type="text"
        className="event-search-input"
        placeholder="Search events by title or venue..."
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
        aria-label="Search events by title or venue"
      />

      {inputValue && (
        <button
          type="button"
          className="clear-search"
          onClick={() => setInputValue('')}
          aria-label="Clear search"
        >
          ×
        </button>
      )}

      <button
        type="button"
        className="focus-search-btn"
        onClick={handleFocusSearch}
      >
        Focus Search
      </button>
    </div>
  );
}

export default EventSearch;
