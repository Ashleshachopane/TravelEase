import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

export default function BookingForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  // useForm without yup/resolver - using inline validation rules
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: { name: "", email: "", guests: 1, date: "" }
  });

  const onSubmit = async (data) => {
    // normalize guests to number
    data.guests = Number(data.guests);

    // Demo: save booking to localStorage (replace with real API call)
    const bookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    bookings.unshift({ id, ...data, createdAt: new Date().toISOString() });
    localStorage.setItem("bookings", JSON.stringify(bookings));

    alert("Booking confirmed! Returning to destinations.");
    navigate("/destinations");
  };

  return (
    <main className="page">
      <div className="container small">
        <div className="card">
          <h2>Book Your Trip</h2>
          <p className="muted">
            Booking for destination ID: <strong>{id}</strong>
          </p>

          <form className="stack" onSubmit={handleSubmit(onSubmit)} noValidate>
            <label>Name</label>
            <input
              {...register("name", {
                required: "Name required",
                minLength: { value: 2, message: "Enter at least 2 characters" }
              })}
              placeholder="Your full name"
            />
            <p className="err">{errors.name?.message}</p>

            <label>Email</label>
            <input
              {...register("email", {
                required: "Email required",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Invalid email"
                }
              })}
              placeholder="you@example.com"
              type="email"
            />
            <p className="err">{errors.email?.message}</p>

            <label>Date</label>
            <input
              type="date"
              {...register("date", {
                required: "Date required",
                validate: (v) => !!v || "Date required"
              })}
            />
            <p className="err">{errors.date?.message}</p>

            <label>Guests</label>
            <input
              type="number"
              {...register("guests", {
                required: "Number of guests required",
                valueAsNumber: true,
                min: { value: 1, message: "At least 1 guest" }
              })}
              defaultValue={1}
              min={1}
            />
            <p className="err">{errors.guests?.message}</p>

            <div className="row">
              <button className="btn" type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Booking..." : "Confirm Booking"}
              </button>
              <button
                type="button"
                className="btn-outline"
                onClick={() => navigate(-1)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
