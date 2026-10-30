
import { Link } from "react-router-dom";

function Home() {
  return (
    <section className="hero">
      <div className="hero-content">
        <p className="hero-label">CONNECT • PARTICIPATE • GROW</p>

        <h1>
          Make Your Campus
          <br />
          <span>Experience Count</span>
        </h1>

        <p className="hero-description">
          Discover exciting campus events, connect with
          fellow students, and make every moment memorable.
        </p>

        <Link to="/events" className="hero-button">
          Explore Events
        </Link>
      </div>
    </section>
  );
}

export default Home;
