import './EventSort.css';
function EventSort({ sortOption, onSortChange }) {
  return (
    <div className="event-sort">
      <label htmlFor="event-sort-select">
        Sort events:
      </label>

      <select
        id="event-sort-select"
        value={sortOption}
        onChange={(event) => onSortChange(event.target.value)}
      >
        <option value="default">Default order</option>
        <option value="name">Event name (A–Z)</option>
        <option value="date">Date (earliest first)</option>
        <option value="registrations">Most registered</option>
      </select>
    </div>
  );
}

export default EventSort;
