
import { NavLink } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";

function Navbar() {
  const { theme, toggleTheme } = useTheme();

  const getLinkClass = ({ isActive }) =>
    isActive ? "active" : "";

  return (
    <header className="navbar">
      <NavLink to="/" className="logo">
        CampusConnect
      </NavLink>

      <nav>
        <NavLink to="/" end className={getLinkClass}>
          Home
        </NavLink>

        <NavLink to="/events" className={getLinkClass}>
          Events
        </NavLink>

        <NavLink to="/register" className={getLinkClass}>
          Register
        </NavLink>

        <button
          type="button"
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${
            theme === "light" ? "dark" : "light"
          } theme`}
        >
          {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
        </button>
      </nav>
    </header>
  );
}

export default Navbar;
