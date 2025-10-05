import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function Logout() {
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    logout();
    toast.success("Successfully logged out!");
  }, []);

  return (
    <main className="page">
      <div className="container small center">
        <div className="card">
          <h3>You are logged out</h3>
          <p className="muted">Thanks for visiting. Come back soon!</p>
          <Link to="/" className="btn">Home</Link>
        </div>
      </div>
    </main>
  );
}
