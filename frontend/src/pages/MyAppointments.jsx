import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

export default function MyAppointments() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/appointments/my", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(setData);
  }, []);

  return (
    <>
      <Navbar />
      <div className="p-6">
        {data.map(a => (
          <div key={a.id} className="border p-2 mb-2">
            {a.doctor_name} - {new Date(a.date).toLocaleString()}
          </div>
        ))}
      </div>
    </>
  );
}