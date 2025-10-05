import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Components
import Navbar from "./components/Navbar";

// Pages
import Home from "./pages/Home";
import Destinations from "./pages/Destinations";
import DestinationDetails from "./pages/DestinationDetails";
import BookingForm from "./pages/BookingForm";
import Bookings from "./pages/Bookings";
import Login from "./pages/Login";
import Logout from "./pages/Logout";

// Context
import { AuthContext } from "./context/AuthContext";

// Protected route wrapper
function Protected({ children }) {
  const { isAuth } = useContext(AuthContext);
  return isAuth ? children : <Navigate to="/login" replace />;
}

export default function App() {
  const { isAuth } = useContext(AuthContext);

  return (
    <div className="app">
      {/* Show navbar only when logged in */}
      {isAuth && <Navbar />}

      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        {/* Protected routes */}
        <Route
          path="/destinations"
          element={
            <Protected>
              <Destinations />
            </Protected>
          }
        />
        <Route
          path="/destinations/:id"
          element={
            <Protected>
              <DestinationDetails />
            </Protected>
          }
        />
        <Route
          path="/booking/:id"
          element={
            <Protected>
              <BookingForm />
            </Protected>
          }
        />
        <Route
          path="/bookings"
          element={
            <Protected>
              <Bookings />
            </Protected>
          }
        />
        <Route path="/logout" element={<Logout />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}
