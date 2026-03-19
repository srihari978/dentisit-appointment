import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function MyAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointments = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const res = await fetch("http://localhost:5000/api/appointments/my", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.status === 401) {
          navigate("/login");
          return;
        }

        const data = await res.json();
        setAppointments(data);
      } catch (err) {
        console.error("Error fetching appointments:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [navigate]);

  return (
    <>
      <Navbar />

      <div className="p-6 bg-gray-100 min-h-screen">
        <h2 className="text-2xl font-bold mb-6 text-center">My Appointments</h2>

        {loading ? (
          <p className="text-center text-gray-500">Loading appointments...</p>
        ) : appointments.length === 0 ? (
          <p className="text-center text-gray-500">No appointments found</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {appointments.map((a) => (
              <div key={a.id} className="bg-white p-4 rounded-xl shadow">
                <h3 className="text-lg font-semibold text-blue-600">
                  {a.doctor_name}
                </h3>
                <p>Patient: {a.patient_name}</p>
                <p>Date: {new Date(a.date).toLocaleDateString()}</p>
                <p>
                  Time:{" "}
                  {new Date(a.date).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}