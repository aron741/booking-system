import { useEffect, useState } from "react";
import API from "../services/api";

export default function MyAppointments() {
  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = async () => {
    try {
      const res = await API.get("/appointments/me");
      setAppointments(res.data);
    } catch (err) {
      alert("Failed to load appointments");
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div>
      <div className="page-title">My Appointments</div>

      {appointments.length === 0 ? (
        <div className="empty-state">You have no appointments yet.</div>
      ) : (
        <div className="card-grid">
          {appointments.map((appointment) => (
            <div className="card" key={appointment.id}>
              <h3>
                {new Date(appointment.availability.date).toLocaleDateString()}
              </h3>
              <p>
                {appointment.availability.startTime} -{" "}
                {appointment.availability.endTime}
              </p>
              <p>Status: {appointment.status}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}