import { useState } from "react";
import API from "../services/api";

export default function Admin() {
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const createSlot = async () => {
    try {
      await API.post("/availability", {
        date,
        startTime,
        endTime,
      });

      alert("Slot created");
      setDate("");
      setStartTime("");
      setEndTime("");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to create slot");
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
          Admin Controls
        </p>
        <h2 className="mt-2 text-2xl font-bold text-slate-900">
          Create a new availability slot
        </h2>
        <p className="mt-2 text-sm text-slate-500">
          Add open time slots that users can book from the dashboard.
        </p>

        <div className="mt-8 space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Date
            </label>
            <input
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-blue-500 focus:bg-white"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Start Time
            </label>
            <input
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-blue-500 focus:bg-white"
              type="text"
              placeholder="09:00"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              End Time
            </label>
            <input
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-blue-500 focus:bg-white"
              type="text"
              placeholder="10:00"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
          </div>

          <button
            onClick={createSlot}
            className="w-full rounded-2xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Create Slot
          </button>
        </div>
      </div>

      <div className="rounded-3xl bg-slate-900 p-8 text-white shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-300">
          Admin Notes
        </p>
        <h3 className="mt-3 text-2xl font-bold">Scheduling Guidance</h3>
        <ul className="mt-6 space-y-4 text-sm text-slate-300">
          <li>• Use clear 24-hour time formatting like 09:00 or 14:30.</li>
          <li>• Add only valid business hours that users can actually reserve.</li>
          <li>• Newly created slots appear instantly on the Booking page.</li>
        </ul>
      </div>
    </div>
  );
}