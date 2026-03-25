import { useEffect, useState } from "react";
import API from "../services/api";

export default function Booking() {
  const [slots, setSlots] = useState([]);

  const fetchSlots = async () => {
    try {
      const res = await API.get("/availability");
      setSlots(res.data);
    } catch (err) {
      alert("Failed to load slots");
    }
  };

  const handleBook = async (slotId) => {
    try {
      await API.post("/appointments", {
        availabilityId: slotId,
      });
      alert("Appointment booked");
      fetchSlots();
    } catch (err) {
      alert(err.response?.data?.message || "Booking failed");
    }
  };

  useEffect(() => {
    fetchSlots();
  }, []);

  return (
    <div>
      <div className="page-title">Available Slots</div>

      {slots.length === 0 ? (
        <div className="empty-state">No slots available right now.</div>
      ) : (
        <div className="card-grid">
          {slots.map((slot) => (
            <div className="card" key={slot.id}>
              <h3>{new Date(slot.date).toLocaleDateString()}</h3>
              <p>
                {slot.startTime} - {slot.endTime}
              </p>
              <button
                className="primary-button"
                onClick={() => handleBook(slot.id)}
              >
                Book Appointment
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}