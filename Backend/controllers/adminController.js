const db = require("../config/db");

// ✅ ADMIN LOGIN (HARDCODED)
const adminLogin = (req, res) => {
  const { email, password } = req.body;

  if (email === "srihari@gmail.com" && password === "1234") {
    return res.json({ success: true });
  }

  res.status(401).json({ message: "Invalid admin credentials" });
};

// ✅ ADD DOCTOR
const addDoctor = async (req, res) => {
  const { name, qualification, experience, photo } = req.body;

  const result = await db.query(
    "INSERT INTO doctors (name, qualification, experience, photo) VALUES ($1,$2,$3,$4) RETURNING *",
    [name, qualification, experience, photo]
  );

  res.json(result.rows[0]);
};

// ✅ GET DOCTORS (for dropdown)
const getDoctors = async (req, res) => {
  const result = await db.query("SELECT id, name FROM doctors");
  res.json(result.rows);
};

// ✅ ADD SLOT (PREVENT PAST TIME)
const addSlot = async (req, res) => {
  const { doctor_id, slot_date, slot_time } = req.body;
  console.log(doctor_id);
  const selectedDateTime = new Date(`${slot_date}T${slot_time}`);
  const now = new Date();

  if (selectedDateTime < now) {
    return res.status(400).json({ message: "Cannot add past date/time" });
  }
  console.log(doctor_id)
  const result = await db.query(
    "INSERT INTO slots (doctor_id, slot_date, slot_time) VALUES ($1,$2,$3) RETURNING *",
    [doctor_id, slot_date, slot_time]
  );

  res.json(result.rows[0]);
};

module.exports = { adminLogin, addDoctor, addSlot, getDoctors };