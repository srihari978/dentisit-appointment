import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import API from "../api/authApi";

export default function Admin() {
  const [doctors, setDoctors] = useState([]);

  // Doctor form
  const [doctor, setDoctor] = useState({
    name: "",
    qualification: "",
    experience: ""
  });

  // Slot form
  const [slot, setSlot] = useState({
    doctorId: "",
    slot_date: "",
    slot_time: ""
  });

  // Fetch all doctors on mount
  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const res = await API.get("/doctors");
      setDoctors(res.data);
    } catch (err) {
      alert("Error fetching doctors");
      console.error(err);
    }
  };

  // Add new doctor
  const addDoctor = async () => {
    try {
      if (!doctor.name || !doctor.qualification || !doctor.experience) {
        alert("Please fill all doctor fields");
        return;
      }

      await API.post("/admin/add-doctor", doctor);
      alert("Doctor added!");
      setDoctor({ name: "", qualification: "", experience: "" });
      fetchDoctors(); // refresh doctor list
    } catch (err) {
      alert("Error adding doctor");
      console.error(err);
    }
  };

  // Add new slot
  const addSlot = async () => {
    try {
      if (!slot.doctorId || !slot.slot_date || !slot.slot_time) {
        alert("Please fill all slot fields");
        return;
      }

      await API.post("/admin/add-slot", slot);
      alert("Slot added!");
      setSlot({ doctorId: "", slot_date: "", slot_time: "" });
    } catch (err) {
      alert("Error adding slot");
      console.error(err);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />

      <div className="p-6 grid md:grid-cols-2 gap-6">

        {/* Doctors List */}
        <div className="bg-white p-6 shadow rounded-2xl md:col-span-2">
          <h2 className="text-xl font-bold mb-4 text-blue-600">
            All Doctors
          </h2>

          {doctors.map((doc) => (
            <div
              key={doc.id}
              className="border p-3 mb-2 rounded-lg flex justify-between"
            >
              <div>
                <p className="font-semibold">{doc.name}</p>
                <p className="text-sm text-gray-500">
                  {doc.qualification} • {doc.experience} yrs
                </p>
              </div>
              <span className="text-sm text-green-600">Available</span>
            </div>
          ))}
        </div>

        {/* Add Doctor */}
        <div className="bg-white p-6 shadow rounded-2xl">
          <h2 className="text-xl font-bold mb-4 text-blue-600">Add Doctor</h2>

          <input
            placeholder="Name"
            className="w-full border p-2 mb-3 rounded-lg"
            value={doctor.name}
            onChange={(e) => setDoctor({ ...doctor, name: e.target.value })}
          />

          <input
            placeholder="Qualification"
            className="w-full border p-2 mb-3 rounded-lg"
            value={doctor.qualification}
            onChange={(e) => setDoctor({ ...doctor, qualification: e.target.value })}
          />

          <input
            type="number"
            placeholder="Experience"
            className="w-full border p-2 mb-3 rounded-lg"
            value={doctor.experience}
            onChange={(e) => setDoctor({ ...doctor, experience: e.target.value })}
          />

          <button
            onClick={addDoctor}
            className="w-full bg-blue-600 text-white py-2 rounded-lg"
          >
            Add Doctor
          </button>
        </div>

        {/* Add Slot */}
        <div className="bg-white p-6 shadow rounded-2xl">
          <h2 className="text-xl font-bold mb-4 text-green-600">Add Slot</h2>

          {/* Select Doctor */}
          <select
            className="w-full border p-2 mb-3 rounded-lg"
            value={slot.doctorId}
            onChange={(e) => setSlot({ ...slot, doctorId: e.target.value })}
          >
            <option value="">Select Doctor</option>
            {doctors.map((doc) => (
              <option key={doc.id} value={doc.id}>
                {doc.name}
              </option>
            ))}
          </select>

          {/* Slot Date */}
          <input
            type="date"
            className="w-full border p-2 mb-3 rounded-lg"
            value={slot.slot_date}
            onChange={(e) => setSlot({ ...slot, slot_date: e.target.value })}
          />

          {/* Slot Time */}
          <input
            type="time"
            className="w-full border p-2 mb-3 rounded-lg"
            value={slot.slot_time}
            onChange={(e) => setSlot({ ...slot, slot_time: e.target.value })}
          />

          <button
            onClick={addSlot}
            className="w-full bg-green-600 text-white py-2 rounded-lg"
          >
            Add Slot
          </button>
        </div>

      </div>
    </div>
  );
}