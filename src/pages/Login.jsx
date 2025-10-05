import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // demo credentials
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }
    if (email === "user@travel.com" && password === "1234") {
      login();
      navigate("/destinations", { replace: true });
    } else {
      alert("Invalid credentials — use user@travel.com / 1234");
    }
  };

  return (
    <main className="page login-page">
      <div className="container small">
        <div className="card auth-card">
          <h2>Login to TravelEase</h2>
          <form className="stack" onSubmit={handleSubmit}>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button className="btn" type="submit">Login</button>
            <div className="muted small">Demo: user@travel.com / 1234</div>
          </form>
        </div>
      </div>
    </main>
  );
}
