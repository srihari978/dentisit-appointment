import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/doctors")
      .then(res => res.json())
      .then(data => setDoctors(data))
      .catch(err => console.error("Error fetching doctors:", err));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Doctors</h2>

      <div className="flex flex-wrap gap-4">
        {doctors.length === 0 && <p>No doctors found.</p>}

        {doctors.map(doc => (
          <div key={doc.id} className="border p-4 rounded shadow w-60">
            <img
              src={doc.photo}
              alt={doc.name}
              className="w-full h-32 object-cover rounded"
            />
            <h3 className="text-xl font-semibold mt-2">{doc.name}</h3>
            <p>{doc.qualification}</p>
            <p>{doc.experience} years exp</p>

            <button
              onClick={() => navigate(`/book/${doc.id}`)}
              className="mt-2 bg-blue-600 text-white px-3 py-1 rounded"
            >
              View Slots
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}