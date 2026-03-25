import { useEffect, useState } from "react";
import API from "../services/api";

export default function Booking() {
  const [slots, setSlots] = useState([]);

  const fetchSlots = async () => {
    try {
      const res = await API.get("/availability");
      setSlots(res.data);
    } catch (err) {
      console.error(err);
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
      console.error(err);
      alert(err.response?.data?.message || "Booking failed");
    }
  };

  useEffect(() => {
    fetchSlots();
  }, []);

  return (
    <div>
      <h1>Available Slots</h1>

      {slots.length === 0 ? (
        <p>No slots available</p>
      ) : (
        slots.map((slot) => (
          <div
            key={slot.id}
            style={{
              border: "1px solid #ccc",
              padding: "1rem",
              marginBottom: "1rem",
            }}
          >
            <p>Date: {new Date(slot.date).toLocaleDateString()}</p>
            <p>
              Time: {slot.startTime} - {slot.endTime}
            </p>
            <button onClick={() => handleBook(slot.id)}>Book</button>
          </div>
        ))
      )}
    </div>
  );
}