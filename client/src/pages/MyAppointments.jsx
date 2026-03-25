import { useEffect, useState } from "react";
import API from "../services/api";

export default function MyAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAppointments = async () => {
    try {
      const res = await API.get("/appointments/me");
      setAppointments(res.data);
    } catch (err) {
      alert("Failed to load appointments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  if (loading) {
    return (
      <div className="rounded-3xl bg-white p-8 text-slate-500 shadow-sm ring-1 ring-slate-200">
        Loading appointments...
      </div>
    );
  }

  if (appointments.length === 0) {
    return (
      <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
        <h2 className="text-xl font-semibold text-slate-900">No appointments yet</h2>
        <p className="mt-2 text-sm text-slate-500">
          You haven’t booked any appointments yet.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {appointments.map((appointment) => (
        <div
          key={appointment.id}
          className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-xl"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-emerald-600">
                Confirmed Appointment
              </p>
              <h3 className="mt-2 text-xl font-bold text-slate-900">
                {new Date(appointment.availability.date).toLocaleDateString()}
              </h3>
            </div>
            <div className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
              {appointment.status}
            </div>
          </div>

          <div className="mt-6 rounded-2xl bg-slate-50 p-4">
            <p className="text-sm text-slate-500">Time</p>
            <p className="mt-1 text-lg font-semibold text-slate-900">
              {appointment.availability.startTime} -{" "}
              {appointment.availability.endTime}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}