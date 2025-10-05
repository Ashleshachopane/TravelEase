import React, { useEffect, useState } from "react";

export default function Bookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("bookings") || "[]");
    setBookings(stored);
  }, []);

  const handleDelete = (index) => {
    const updated = bookings.filter((_, i) => i !== index);
    localStorage.setItem("bookings", JSON.stringify(updated));
    setBookings(updated);
  };

  return (
    <main className="page">
      <div className="container">
        <h2>My Bookings</h2>
        {bookings.length === 0 ? (
          <p className="muted">No bookings yet. Go to Destinations to book a trip!</p>
        ) : (
          <div className="grid">
            {bookings.map((b, i) => (
              <div key={i} className="card">
                <h3>{b.name}</h3>
                <p><strong>Email:</strong> {b.email}</p>
                <p><strong>Destination ID:</strong> {b.id}</p>
                <p><strong>Date:</strong> {b.date}</p>
                <p><strong>Guests:</strong> {b.guests}</p>
                <p className="muted small">Booked on: {new Date(b.createdAt).toLocaleString()}</p>
                <button className="btn-outline" onClick={() => handleDelete(i)}>Cancel Booking</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
