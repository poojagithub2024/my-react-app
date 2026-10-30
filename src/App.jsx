
import "./App.css";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import Navbar from "./components/layout/Navbar";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Events from "./pages/Events";
import Register from "./pages/Register";
import EventDetails from "./pages/EventDetails";
import { EventProvider } from "./context/EventContext";
import ApiDemo from "./pages/ApiDemo";

function AppContent() {
  const { theme } = useTheme();

  return (
    <div className={`App theme-${theme}`}>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:id" element={<EventDetails />} />
        <Route path="/register" element={<Register />} />
        <Route path="/api-demo" element={<ApiDemo />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <EventProvider>
        <AppContent />
      </EventProvider>
    </ThemeProvider>
  );
}

export default App;
