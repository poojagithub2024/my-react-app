
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

      <footer className="site-footer">
        <p className="footer-logo">CampusConnect</p>

        <p className="footer-tagline">
          Connecting students through experiences that matter.
        </p>

        <p className="footer-copyright">
          © 2026 CampusConnect. All rights reserved.
        </p>
      </footer>

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
