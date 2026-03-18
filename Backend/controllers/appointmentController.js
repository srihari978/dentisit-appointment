const db = require("../config/db");

const bookAppointment = async (req, res) => {
  const userId = req.user.id;
  const { slotId, patient_name, age, gender } = req.body;

  const slot = await db.query("SELECT * FROM slots WHERE id=$1", [slotId]);

  if (slot.rows.length === 0)
    return res.status(404).json({ message: "Slot not found" });

  if (slot.rows[0].is_booked)
    return res.status(400).json({ message: "Already booked" });

  const appointmentDate = new Date(
    `${slot.rows[0].slot_date}T${slot.rows[0].slot_time}`
  ).toISOString();

  await db.query(
    `INSERT INTO appointments 
    (user_id, doctor_id, patient_name, age, gender, date)
    VALUES ($1,$2,$3,$4,$5,$6)`,
    [
      userId,
      slot.rows[0].doctor_id,
      patient_name,
      age,
      gender,
      appointmentDate
    ]
  );

  await db.query("UPDATE slots SET is_booked=true WHERE id=$1", [slotId]);

  res.json({ message: "Booked successfully" });
};

const getAppointments = async (req, res) => {
  const userId = req.user.id;

  const result = await db.query(
    `SELECT a.*, d.name as doctor_name 
     FROM appointments a
     JOIN doctors d ON a.doctor_id=d.id
     WHERE user_id=$1`,
    [userId]
  );

  res.json(result.rows);
};

module.exports = { bookAppointment, getAppointments };