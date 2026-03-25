import { useEffect, useState } from "react";
import { Calendar, Clock } from "lucide-react";
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
      await fetchSlots();
    } catch (err) {
      alert(err.response?.data?.message || "Booking failed");
    } finally {
      setBookingId(null);
    }
  };

  useEffect(() => {
    fetchSlots();
  }, []);

  if (loading) {
    return (
      <div className="rounded-3xl bg-white p-8 text-slate-500 shadow-sm ring-1 ring-slate-200">
        Loading available slots...
      </div>
    );
  }

  if (slots.length === 0) {
    return (
      <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
        <h2 className="text-xl font-semibold text-slate-900">No slots available</h2>
        <p className="mt-2 text-sm text-slate-500">
          No available slots yet. Check back later or contact admin.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {slots.map((slot) => (
        <div
          key={slot.id}
          className="group rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-xl"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
                Available Slot
              </p>

              <div className="mt-3 flex items-center gap-2 text-slate-900">
                <Calendar className="h-5 w-5 text-blue-600" />
                <h3 className="text-xl font-bold">
                  {new Date(slot.date).toLocaleDateString()}
                </h3>
              </div>
            </div>

            <div className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
              Open
            </div>
          </div>

          <div className="mt-6 rounded-2xl bg-slate-50 p-4">
            <p className="text-sm text-slate-500">Time</p>

            <div className="mt-2 flex items-center gap-2 text-slate-900">
              <Clock className="h-5 w-5 text-slate-400" />
              <p className="text-lg font-semibold">
                {slot.startTime} - {slot.endTime}
              </p>
            </div>
          </div>

          <button
            className="mt-6 w-full rounded-2xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
            disabled={bookingId === slot.id}
            onClick={() => handleBook(slot.id)}
          >
            {bookingId === slot.id ? "Booking..." : "Book Appointment"}
          </button>
        </div>
      ))}
    </div>
  );
}