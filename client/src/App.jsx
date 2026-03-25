import { useState } from "react";
import Login from "./pages/Login";
import Booking from "./pages/Booking";
import MyAppointments from "./pages/MyAppointments";
import Admin from "./pages/Admin";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );
  const [page, setPage] = useState("booking");

  const handleLogout = () => {
    const shouldLogout = window.confirm("Are you sure you want to logout?");

    if (shouldLogout) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setIsLoggedIn(false);
      setPage("booking");
    }
  };

  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="app-shell">
      <div className="container">
        <div className="topbar">
          <div className="brand">📅 Bookify</div>

          <div className="nav-actions">
            <button
              className={`nav-button ${page === "booking" ? "active" : ""}`}
              onClick={() => setPage("booking")}
            >
              Booking
            </button>

            <button
              className={`nav-button ${page === "appointments" ? "active" : ""}`}
              onClick={() => setPage("appointments")}
            >
              My Appointments
            </button>

            <button
              className={`nav-button ${page === "admin" ? "active" : ""}`}
              onClick={() => setPage("admin")}
            >
              Admin
            </button>

            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>

        <div className="page-wrapper">
          {page === "booking" && <Booking />}
          {page === "appointments" && <MyAppointments />}
          {page === "admin" && <Admin />}
        </div>

        <div className="footer">
          © {new Date().getFullYear()} Bookify. Built with React & Node.js
        </div>
      </div>
    </div>
  );
}

export default App;