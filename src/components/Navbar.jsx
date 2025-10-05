import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import ToggleTheme from "./ToggleTheme";

export default function Navbar() {
  const { logout } = useContext(AuthContext);
  const loc = useLocation();

  return (
    <header className="nav">
      <div className="nav-brand">
        <Link to="/" className="brand">TravelEase</Link>
      </div>

      <nav className="nav-links">
        <Link
          to="/destinations"
          className={loc.pathname.startsWith("/destinations") ? "active" : ""}
        >
          Destinations
        </Link>

        <Link
          to="/bookings"
          className={loc.pathname.startsWith("/bookings") ? "active" : ""}
        >
          Bookings
        </Link>
      </nav>

      <div className="nav-actions">
        <ToggleTheme />
        <Link to="/logout" className="btn-ghost" onClick={logout}>
          Logout
        </Link>
      </div>
    </header>
  );
}
