
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { initialEvents } from "../data/events";

const EventContext = createContext(null);

const initialState = {
  events: initialEvents,
  favorites: [],
  registered: [],
};

function eventReducer(state, action) {
  switch (action.type) {
    case "REGISTER_EVENT": {
      const { id } = action.payload;

      if (state.registered.includes(id)) return state;

      return {
        ...state,
        registered: [...state.registered, id],
        events: state.events.map((event) =>
          event.id === id
            ? { ...event, registrations: event.registrations + 1 }
            : event
        ),
      };
    }

    case "TOGGLE_FAVORITE": {
      const { id } = action.payload;

      return {
        ...state,
        favorites: state.favorites.includes(id)
          ? state.favorites.filter((item) => item !== id)
          : [...state.favorites, id],
      };
    }

    case "REMOVE_EVENT": {
      const { id } = action.payload;

      return {
        ...state,
        events: state.events.filter((event) => event.id !== id),
        favorites: state.favorites.filter((item) => item !== id),
        registered: state.registered.filter((item) => item !== id),
      };
    }

    case "ADD_EVENT":
      return {
        ...state,
        events: [...state.events, action.payload],
      };

    case "LOAD_SAVED_STATE":
      return action.payload;

    default:
      return state;
  }
}

function loadInitialState() {
  try {
    const savedState = localStorage.getItem("campusConnectEvents");

    if (savedState) {
      const parsedState = JSON.parse(savedState);

      if (
        parsedState &&
        Array.isArray(parsedState.events) &&
        Array.isArray(parsedState.favorites) &&
        Array.isArray(parsedState.registered)
      ) {
        return parsedState;
      }
    }
  } catch (error) {
    console.error("Could not load saved events:", error);
  }

  return initialState;
}

export function EventProvider({ children }) {
  const [state, dispatch] = useReducer(
    eventReducer,
    undefined,
    loadInitialState
  );

  useEffect(() => {
    try {
      localStorage.setItem("campusConnectEvents", JSON.stringify(state));
    } catch (error) {
      console.error("Could not save events:", error);
    }
  }, [state]);

  return (
    <EventContext.Provider value={{ state, dispatch }}>
      {children}
    </EventContext.Provider>
  );
}

export function useEvents() {
  const context = useContext(EventContext);

  if (context === null) {
    throw new Error("useEvents must be used inside EventProvider");
  }

  return context;
}
