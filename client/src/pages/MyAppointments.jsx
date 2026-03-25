import { useEffect, useState } from "react";
import API from "../services/api";

export default function MyAppointments() {
  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = async () => {
    try {
      const res = await API.get("/appointments/me");
      setAppointments(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load appointments");
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>My Appointments</h1>

      {appointments.length === 0 ? (
        <p>No appointments yet</p>
      ) : (
        appointments.map((appointment) => (
          <div
            key={appointment.id}
            style={{
              border: "1px solid #ccc",
              padding: "1rem",
              marginBottom: "1rem",
            }}
          >
            <p>
              Date:{" "}
              {new Date(appointment.availability.date).toLocaleDateString()}
            </p>
            <p>
              Time: {appointment.availability.startTime} -{" "}
              {appointment.availability.endTime}
            </p>
            <p>Status: {appointment.status}</p>
          </div>
        ))
      )}
    </div>
  );
}