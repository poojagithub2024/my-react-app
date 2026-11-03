
import { useState } from "react";
import EventCard from "./Eventcard";
import { useEvents } from "../context/EventContext";
import "./Eventlist.css";

function EventList() {
  const { state, dispatch } = useEvents();
  const { events, favorites, registered } = state;

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    date: "",
    venue: "",
    description: "",
  });

  const categories = [
    "All",
    ...new Set(events.map((event) => event.category)),
  ];

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleAddEvent = (event) => {
    event.preventDefault();

    const newEvent = {
      id: Date.now(),
      title: formData.title.trim(),
      category: formData.category.trim(),
      description: formData.description.trim(),
      date: new Date(`${formData.date}T00:00:00`).toLocaleDateString(
        "en-US",
        {
          year: "numeric",
          month: "long",
          day: "numeric",
        }
      ),
      venue: formData.venue.trim(),
      registrations: 0,
    };

    dispatch({ type: "ADD_EVENT", payload: newEvent });

    setFormData({
      title: "",
      category: "",
      date: "",
      venue: "",
      description: "",
    });
  };

  const handleResetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All");
    
  };

  const filteredEvents = events.filter((event) => {
    const search = searchTerm.toLowerCase().trim();

    const matchesCategory =
      selectedCategory === "All" ||
      event.category === selectedCategory;

    const matchesSearch =
      event.title.toLowerCase().includes(search) ||
      event.venue.toLowerCase().includes(search) ||
      event.category.toLowerCase().includes(search);

    return matchesCategory && matchesSearch;
  });

  

  const handleRegister = (id) => {
    if (registered.includes(id)) {
      alert("You have already registered for this event!");
      return;
    }

    dispatch({ type: "REGISTER_EVENT", payload: { id } });
  };

  const handleFavorite = (id) => {
    dispatch({ type: "TOGGLE_FAVORITE", payload: { id } });
  };

  const handleRemove = (id) => {
    dispatch({ type: "REMOVE_EVENT", payload: { id } });
  };

  return (
    <section className="events-page">
      <div className="events-heading">
        <p className="events-eyebrow">DISCOVER YOUR CAMPUS</p>
        <h1>Upcoming Events</h1>
        <p className="events-subtitle">
          Find opportunities to learn, connect, and participate.
        </p>
      </div>

      <form className="add-event-form" onSubmit={handleAddEvent}>
        <h2>Add a New Event</h2>

        <div className="event-form-grid">
          <div className="form-group">
            <label htmlFor="event-title">Event Title</label>
            <input
              id="event-title"
              name="title"
              type="text"
              placeholder="Enter event title"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="event-category">Category</label>
            <input
              id="event-category"
              name="category"
              type="text"
              placeholder="e.g. Technology, Culture, Sports"
              value={formData.category}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="event-date">Date</label>
            <input
              id="event-date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="event-venue">Venue</label>
            <input
              id="event-venue"
              name="venue"
              type="text"
              placeholder="Enter event venue"
              value={formData.venue}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group full-width">
            <label htmlFor="event-description">Description</label>
            <textarea
              id="event-description"
              name="description"
              placeholder="Write a short description of the event..."
              value={formData.description}
              onChange={handleInputChange}
              rows="3"
              required
            />
          </div>
        </div>

        <button type="submit" className="add-event-btn">
          Add Event
        </button>
      </form>

      <div className="event-filter-toolbar">
        <input
          type="search"
          className="filter-search"
          placeholder="Search by title or venue..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />

        <select
          className="filter-category"
          value={selectedCategory}
          onChange={(event) => setSelectedCategory(event.target.value)}
          aria-label="Filter by category"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category === "All" ? "All Categories" : category}
            </option>
          ))}
        </select>

        

        <button
          type="button"
          className="reset-filters-btn"
          onClick={handleResetFilters}
        >
          Reset Filters
        </button>
      </div>

      {events.length === 0 ? (
        <p className="no-events">No events available. Add your first event!</p>
      ) : filteredEvents.length === 0 ? (
        <p className="no-events">No matching events found.</p>
      ) : (
        <div className="event-list">
          {filteredEvents.map((event) =>  (
            <EventCard
              key={event.id}
              event={event}
              onRegister={handleRegister}
              onFavorite={handleFavorite}
              onRemove={handleRemove}
              isFavorite={favorites.includes(event.id)}
              isRegistered={registered.includes(event.id)}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default EventList;
