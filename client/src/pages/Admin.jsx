import { useState } from "react";
import { ShieldCheck, CalendarPlus2, Clock3, Info } from "lucide-react";
import API from "../services/api";

export default function Admin() {
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [loading, setLoading] = useState(false);

  const createSlot = async () => {
    setLoading(true);

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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-blue-50 p-3 text-blue-600">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
              Admin Controls
            </p>
            <h2 className="mt-1 text-2xl font-bold text-slate-900">
              Create a new availability slot
            </h2>
          </div>
        </div>

        <p className="mt-4 text-sm text-slate-500">
          Add open time slots that users can book from the dashboard.
        </p>

        <div className="mt-8 space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Date
            </label>
            <div className="relative">
              <input
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 pr-12 outline-none transition focus:border-blue-500 focus:bg-white"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
              <CalendarPlus2 className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Start Time
            </label>
            <div className="relative">
              <input
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 pr-12 outline-none transition focus:border-blue-500 focus:bg-white"
                type="text"
                placeholder="09:00"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
              <Clock3 className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              End Time
            </label>
            <div className="relative">
              <input
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 pr-12 outline-none transition focus:border-blue-500 focus:bg-white"
                type="text"
                placeholder="10:00"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
              <Clock3 className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            </div>
          </div>

          <button
            onClick={createSlot}
            disabled={loading}
            className="w-full rounded-2xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
          >
            {loading ? "Creating..." : "Create Slot"}
          </button>
        </div>
      </div>

      <div className="rounded-3xl bg-slate-900 p-8 text-white shadow-sm">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-blue-500/10 p-3 text-blue-300">
            <Info className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-300">
              Admin Notes
            </p>
            <h3 className="mt-1 text-2xl font-bold">Scheduling Guidance</h3>
          </div>
        </div>

        <ul className="mt-6 space-y-4 text-sm text-slate-300">
          <li>• Use clear 24-hour time formatting like 09:00 or 14:30.</li>
          <li>• Add only valid business hours that users can actually reserve.</li>
          <li>• Newly created slots appear instantly on the Booking page.</li>
          <li>• Keep time blocks consistent for a cleaner booking experience.</li>
        </ul>
      </div>
    </div>
  );
}