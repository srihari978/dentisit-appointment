import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/Navbar"; // <-- default import

export default function Dashboard() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/doctors")
      .then(res => res.json())
      .then(data => {
        setDoctors(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const viewSlots = async (doctorId, doctorName) => {
    const res = await fetch(`http://localhost:5000/api/slots/${doctorId}`);
    const slots = await res.json();
    navigate(`/book/${doctorId}`, { state: { availableSlots: slots, doctorName } });
  };

  if (loading) return <p>Loading doctors...</p>;

  return (
    <>
      <NavBar />
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Doctors</h2>
        <div className="flex flex-wrap gap-4">
          {doctors.length === 0 && <p>No doctors found.</p>}
          {doctors.map(doc => (
            <div key={doc.id} className="border p-4 rounded shadow w-64">
              {doc.photo && (
                <img src={doc.photo} alt={doc.name} className="w-full h-40 object-cover rounded mb-2" />
              )}
              <h3 className="text-xl font-semibold">{doc.name}</h3>
              {doc.qualification && <p className="text-gray-600">{doc.qualification}</p>}
              {doc.experience !== undefined && <p className="text-gray-600">{doc.experience} years experience</p>}
              <button
                onClick={() => viewSlots(doc.id, doc.name)}
                className="mt-2 bg-blue-600 text-white px-3 py-1 rounded"
              >
                View Slots
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}