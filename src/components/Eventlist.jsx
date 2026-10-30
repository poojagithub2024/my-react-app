
import { useState } from "react";
import EventCard from "./Eventcard";
import EventSearch from "./EventSearch";
import CategoryFilter from "./CategoryFilter";
import EventSort from "./EventSort";
import { useEvents } from "../context/EventContext";
import "./Eventlist.css";

function EventList() {
  const { state, dispatch } = useEvents();
  const { events, favorites, registered } = state;

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOption, setSortOption] = useState("default");

  const categories = [
    "All",
    ...new Set(events.map((event) => event.category)),
  ];

  const filteredEvents = events.filter((event) => {
    const search = searchTerm.toLowerCase().trim();

    const matchesCategory =
      selectedCategory === "All" ||
      event.category === selectedCategory;

    const matchesSearch =
      event.title.toLowerCase().includes(search) ||
      event.venue.toLowerCase().includes(search);

    return matchesCategory && matchesSearch;
  });

  const sortedEvents = [...filteredEvents].sort((a, b) => {
    switch (sortOption) {
      case "name":
        return a.title.localeCompare(b.title);
      case "date":
        return new Date(a.date) - new Date(b.date);
      case "registrations":
        return b.registrations - a.registrations;
      default:
        return 0;
    }
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

  const handleAddEvent = () => {
    const newEvent = {
      id: Date.now(),
      title: "New Campus Event",
      category: "Campus",
      description:
        "Join us to learn new skills and connect with students.",
      date: "December 5, 2026",
      venue: "College Auditorium",
      registrations: 0,
    };

    dispatch({ type: "ADD_EVENT", payload: newEvent });
  };

  return (
    <section className="events-page">
      <header className="events-header">
        <p className="events-eyebrow">DISCOVER YOUR CAMPUS</p>
        <h1>Upcoming Events</h1>

        <p className="events-subtitle">
          Find opportunities to learn, connect, and participate.
        </p>

        <button className="add-event-btn" onClick={handleAddEvent}>
          Add Sample Event
        </button>

        <EventSearch
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />

        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        <EventSort
          sortOption={sortOption}
          onSortChange={setSortOption}
        />
      </header>

      {events.length === 0 ? (
        <p className="no-events">No events available.</p>
      ) : sortedEvents.length === 0 ? (
        <p className="no-events">No matching events found.</p>
      ) : (
        <div className="event-list">
          {sortedEvents.map((event) => (
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
