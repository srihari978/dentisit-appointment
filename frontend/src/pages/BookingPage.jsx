import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/doctors")
      .then(res => res.json())
      .then(setDoctors);
  }, []);

  return (
    <>
      <Navbar />
      <div className="p-6 grid grid-cols-3 gap-4">
        {doctors.map(doc => (
          <div key={doc.id} className="border p-4">
            <img src={doc.photo} className="h-32 w-full" />
            <h2>{doc.name}</h2>
            <p>{doc.qualification}</p>

            <button
              onClick={() => navigate(`/book/${doc.id}`)}
              className="bg-blue-500 text-white px-2 py-1 mt-2"
            >
              Book Appointment
            </button>
          </div>
        ))}
      </div>
    </>
  );
}