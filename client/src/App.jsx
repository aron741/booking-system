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
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setPage("booking");
  };

  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div style={{ padding: "2rem" }}>
      <nav style={{ marginBottom: "2rem" }}>
        <button
          onClick={() => setPage("booking")}
          style={{ marginRight: "1rem" }}
        >
          Booking
        </button>

        <button
          onClick={() => setPage("appointments")}
          style={{ marginRight: "1rem" }}
        >
          My Appointments
        </button>

        <button
          onClick={() => setPage("admin")}
          style={{ marginRight: "1rem" }}
        >
          Admin
        </button>

        <button onClick={handleLogout}>Logout</button>
      </nav>

      {page === "booking" && <Booking />}
      {page === "appointments" && <MyAppointments />}
      {page === "admin" && <Admin />}
    </div>
  );
}

export default App;