import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function BookAppointment() {
  const { doctorId } = useParams();
  const [slots, setSlots] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/api/slots/${doctorId}`)
      .then(res => res.json())
      .then(setSlots);
  }, []);

  const book = async (slotId) => {
    await fetch("http://localhost:5000/api/appointments/book", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token")
      },
      body: JSON.stringify({
        slotId,
        patient_name: "Test",
        age: 20,
        gender: "Male"
      })
    });

    alert("Booked!");
    window.location.reload();
  };

  return (
    <>
      <Navbar />
      <div className="p-6">
        {slots.map(s => (
          <button
            key={s.id}
            onClick={() => book(s.id)}
            className="border p-2 m-2"
          >
            {s.slot_date} - {s.slot_time}
          </button>
        ))}
      </div>
    </>
  );
}