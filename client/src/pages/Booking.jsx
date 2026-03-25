import { useEffect, useState } from "react";
import API from "../services/api";

export default function Booking() {
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookingId, setBookingId] = useState(null);

  const fetchSlots = async () => {
    try {
      const res = await API.get("/availability");
      setSlots(res.data);
    } catch (err) {
      alert("Failed to load slots");
    } finally {
      setLoading(false);
    }
  };

  const handleBook = async (slotId) => {
    setBookingId(slotId);

    try {
      await API.post("/appointments", {
        availabilityId: slotId,
      });

      alert("Appointment booked");
      fetchSlots();
    } catch (err) {
      alert(err.response?.data?.message || "Booking failed");
    } finally {
      setBookingId(null);
    }
  };

  useEffect(() => {
    fetchSlots();
  }, []);

  // 🔥 Loading state
  if (loading) {
    return <div className="empty-state">Loading available slots...</div>;
  }

  return (
    <div>
      <div className="page-title">Available Slots</div>

      {slots.length === 0 ? (
        <div className="empty-state">
          No available slots yet. Check back later or contact admin.
        </div>
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
                disabled={bookingId === slot.id}
                onClick={() => handleBook(slot.id)}
              >
                {bookingId === slot.id ? "Booking..." : "Book Appointment"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}