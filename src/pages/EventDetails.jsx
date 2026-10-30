
import { Link, useParams } from "react-router-dom";
import { useEvents } from "../context/EventContext";

function EventDetails() {
  const { id } = useParams();
  const { state, dispatch } = useEvents();

  const event = state.events.find(
    (item) => item.id === Number(id)
  );

  if (!event) {
    return (
      <main className="page-container event-details">
        <h1>Event Not Found</h1>
        <p>This event may have been removed or does not exist.</p>
        <Link to="/events" className="hero-button">
          Back to Events
        </Link>
      </main>
    );
  }

  const isRegistered = state.registered.includes(event.id);
  const isFavorite = state.favorites.includes(event.id);

  const handleRegister = () => {
    if (isRegistered) {
      alert("You have already registered for this event!");
      return;
    }

    dispatch({
      type: "REGISTER_EVENT",
      payload: { id: event.id },
    });
  };

  const handleFavorite = () => {
    dispatch({
      type: "TOGGLE_FAVORITE",
      payload: { id: event.id },
    });
  };

  return (
    <main className="page-container event-details">
      <p className="hero-label">{event.category}</p>
      <h1>{event.title}</h1>
      <p>{event.description}</p>

      <div className="event-detail-info">
        <p><strong>Date:</strong> {event.date}</p>
        <p><strong>Venue:</strong> {event.venue}</p>
        <p>
          <strong>Registrations:</strong> {event.registrations}
        </p>
      </div>

      <div className="event-buttons">
        <button
          type="button"
          className="register-btn"
          onClick={handleRegister}
        >
          {isRegistered ? "Registered" : "Register"}
        </button>

        <button
          type="button"
          className="favorite-btn"
          onClick={handleFavorite}
        >
          {isFavorite ? "★ Favorited" : "Add Favorite"}
        </button>
      </div>

      <Link to="/events" className="hero-button">
        Back to Events
      </Link>
    </main>
  );
}

export default EventDetails;
