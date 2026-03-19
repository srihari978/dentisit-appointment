import { useLocation } from "react-router-dom";
import { useState } from "react";
import Navbar from "../components/Navbar";
export default function BookAppointment() {
  const location = useLocation();
  const { availableSlots, doctorName } = location.state || {};
  const [slots, setSlots] = useState(availableSlots || []);

  const bookSlot = async (slotId) => {
    try {
      // Get patient info (from login, e.g., token)
      const patientName = localStorage.getItem("userName") || "Anonymous";
      const patientId = localStorage.getItem("userId");

      const res = await fetch("http://localhost:5000/api/book-slot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slotId, patientName, patientId }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      alert("Slot booked successfully!");

      // Remove booked slot from UI so other users don’t see it
      setSlots(prev => prev.filter(slot => slot.id !== slotId));
    }catch (err) {
  // Try to get the message from Error, fallback to string if not
  const msg = err?.message || JSON.stringify(err) || "Unknown error";
  alert("Working on slot booking please give some time: ");
  console.error("Working on slot booking:", err);
}
  };

  if (!slots || slots.length === 0) return <p>No slots available.</p>;

  return (
    <>
    <Navbar/>
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Booking for {doctorName}</h2>
      <div className="flex flex-wrap gap-4">
        {slots.map(slot => (
          <div
            key={slot.id}
            className="border p-4 rounded shadow w-48 text-center"
          >
            <p>{slot.slot_date}</p>
            <p>{slot.slot_time}</p>
            <button
              onClick={() => bookSlot(slot.id)}
              className="mt-2 bg-green-600 text-white px-3 py-1 rounded"
            >
              Book Slot
            </button>
          </div>
        ))}
      </div>
    </div>
 </> );
}