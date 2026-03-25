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
    <div>
      <div className="page-title">Admin Panel</div>

      <div className="admin-form">
        <div className="form-group">
          <input
            className="form-input"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="form-group">
          <input
            className="form-input"
            type="text"
            placeholder="Start Time (09:00)"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
        </div>

        <div className="form-group">
          <input
            className="form-input"
            type="text"
            placeholder="End Time (10:00)"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </div>

        <button className="primary-button" onClick={createSlot}>
          Create Slot
        </button>
      </div>
    </div>
  );
}