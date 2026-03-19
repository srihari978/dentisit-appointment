import { useEffect, useState } from "react";
import AdminNavbar from "../components/AdminNavbar";

export default function Admin() {
  const [doctors, setDoctors] = useState([]);

  const [name, setName] = useState("");
  const [qualification, setQualification] = useState("");
  const [experience, setExperience] = useState("");
  const [photo, setPhoto] = useState(""); // ✅ NEW

  const [doctorId, setDoctorId] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  // 🔄 Fetch doctors
  const fetchDoctors = () => {
    fetch("http://localhost:5000/api/admin/doctors")
      .then(res => res.json())
      .then(data => setDoctors(data));
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  // ➕ Add Doctor
  const addDoctor = async () => {
    if (!name || !qualification || !experience || !photo) {
      alert("All fields required");
      return;
    }

    const res = await fetch("http://localhost:5000/api/admin/doctor", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        qualification,
        experience,
        photo // ✅ send image
      })
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message);
    } else {
      alert("Doctor added ✅");
      setName("");
      setQualification("");
      setExperience("");
      setPhoto(""); // reset
      fetchDoctors();
    }
  };

  // ➕ Add Slot
  const addSlot = async () => {
    if (!doctorId || !date || !time) {
      alert("All fields required");
      return;
    }

    const res = await fetch("http://localhost:5000/api/admin/slot", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        doctor_id: doctorId,
        slot_date: date,
        slot_time: time
      })
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message);
    } else {
      alert("Slot added ✅");
      setDate("");
      setTime("");
    }
  };

  return (
    <>
      <AdminNavbar />

      <div className="min-h-screen bg-gray-100 p-6">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
          Admin Panel
        </h1>

        <div className="grid md:grid-cols-2 gap-6">

          {/* ➕ ADD DOCTOR */}
          <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              Add Doctor
            </h2>

            <input
              className="w-full p-3 border rounded-lg mb-3 focus:ring-2 focus:ring-blue-400"
              placeholder="Doctor Name"
              value={name}
              onChange={e => setName(e.target.value)}
            />

            <input
              className="w-full p-3 border rounded-lg mb-3 focus:ring-2 focus:ring-blue-400"
              placeholder="Qualification"
              value={qualification}
              onChange={e => setQualification(e.target.value)}
            />

            <input
              className="w-full p-3 border rounded-lg mb-3 focus:ring-2 focus:ring-blue-400"
              placeholder="Experience (years)"
              value={experience}
              onChange={e => setExperience(e.target.value)}
            />

            {/* ✅ IMAGE URL INPUT */}
            <input
              className="w-full p-3 border rounded-lg mb-3 focus:ring-2 focus:ring-blue-400"
              placeholder="Image URL (doctor photo)"
              value={photo}
              onChange={e => setPhoto(e.target.value)}
            />

            {/* ✅ PREVIEW IMAGE */}
            {photo && (
              <img
                src={photo}
                alt="preview"
                className="w-24 h-24 object-cover rounded-full mb-3 border"
              />
            )}

            <button
              onClick={addDoctor}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Add Doctor
            </button>
          </div>

          {/* ➕ ADD SLOT */}
          <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              Add Slot
            </h2>

            <select
              className="w-full p-3 border rounded-lg mb-3"
              onChange={e => setDoctorId(e.target.value)}
            >
              <option value="">Select Doctor</option>
              {doctors.map(d => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>

            <input
              type="date"
              className="w-full p-3 border rounded-lg mb-3"
              min={new Date().toISOString().split("T")[0]}
              value={date}
              onChange={e => setDate(e.target.value)}
            />

            <input
              type="time"
              className="w-full p-3 border rounded-lg mb-3"
              value={time}
              onChange={e => setTime(e.target.value)}
            />

            <button
              onClick={addSlot}
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
            >
              Add Slot
            </button>
          </div>

        </div>
      </div>
    </>
  );
}