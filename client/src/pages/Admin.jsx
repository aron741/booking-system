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
      console.error(err);
      alert(err.response?.data?.message || "Failed to create slot");
    }
  };

  return (
    <div>
      <h1>Admin - Create Slot</h1>

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        style={{ display: "block", marginBottom: "1rem", padding: "0.5rem" }}
      />

      <input
        type="text"
        placeholder="Start Time (e.g. 09:00)"
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
        style={{ display: "block", marginBottom: "1rem", padding: "0.5rem" }}
      />

      <input
        type="text"
        placeholder="End Time (e.g. 10:00)"
        value={endTime}
        onChange={(e) => setEndTime(e.target.value)}
        style={{ display: "block", marginBottom: "1rem", padding: "0.5rem" }}
      />

      <button onClick={createSlot} style={{ padding: "0.5rem 1rem" }}>
        Create Slot
      </button>
    </div>
  );
}