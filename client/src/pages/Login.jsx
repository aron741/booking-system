import { useState } from "react";
import API from "../services/api";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      alert("Login successful");
      onLogin();
    } catch (err) {
      console.error("LOGIN ERROR:", err);
      console.error("RESPONSE DATA:", err.response?.data);
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Booking System</h1>
      <h2>Login</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ display: "block", marginBottom: "1rem", padding: "0.5rem" }}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ display: "block", marginBottom: "1rem", padding: "0.5rem" }}
      />

      <button onClick={handleLogin} style={{ padding: "0.5rem 1rem" }}>
        Login
      </button>
    </div>
  );
}