
import { Link } from "react-router-dom";
import "./Eventcard.css";

function EventCard({
  event,
  onRegister,
  onFavorite,
  onRemove,
  isFavorite,
  isRegistered,
}) {
  return (
    <div className="event-card">
      <div className="event-image">
        <span>{event.category.toUpperCase()}</span>
      </div>

      <div className="event-details">
        <p className="event-category">{event.category}</p>

        <h2>{event.title}</h2>

        <p className="event-description">
          {event.description}
        </p>

        <p className="event-info">
          <strong>Date:</strong> {event.date}
        </p>

        <p className="event-info">
          <strong>Venue:</strong> {event.venue}
        </p>

        <p className="event-info">
          <strong>Registrations:</strong> {event.registrations}
        </p>

        <div className="event-buttons">
          <button
            className="register-btn"
            onClick={() => onRegister(event.id)}
          >
            {isRegistered ? "Registered" : "Register"}
          </button>

          <button
            className="favorite-btn"
            onClick={() => onFavorite(event.id)}
          >
            {isFavorite ? "★ Favorited" : "Add Favorite"}
          </button>

          <button
            className="remove-btn"
            onClick={() => onRemove(event.id)}
          >
            Remove Event
          </button>

          <Link
            to={`/events/${event.id}`}
            className="view-details-btn"
          >
            View Details →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default EventCard;
