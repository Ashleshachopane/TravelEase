import React from "react";
import { Link } from "react-router-dom";


export default function Home() {
  return (
    <main className="page home-page">
      <section className="hero card">
        <div className="hero-left">
          <h1>Explore the world with TravelEase</h1>
          <p className="muted">Curated destinations, simple bookings and beautiful experiences.</p>
          <div className="hero-cta">
            <Link to="/destinations" className="btn btn-lg">Browse Destinations</Link>
            <Link to="/login" className="link muted">Sign in to book</Link>
          </div>
        </div>
        <div className="hero-right">
          <div className="hero-visual">✈️</div>
        </div>
      </section>

      <section className="features grid-3">
        <div className="feature card">
          <h4>Secure booking</h4>
          <p className="muted">Quick and safe checkout flow with demo data.</p>
        </div>
        <div className="feature card">
          <h4>Top destinations</h4>
          <p className="muted">Sourced live from Travel Advisor (RapidAPI).</p>
        </div>
        <div className="feature card">
          <h4>Responsive UI</h4>
          <p className="muted">Great on mobile, tablet and desktop.</p>
        </div>
      </section>
    </main>
  );
}
