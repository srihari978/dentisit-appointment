const db = require("../config/db");

// Get all available slots for a doctor
const getSlotsByDoctor = async (req, res) => {
  const { doctorId } = req.params;
  try {
    const result = await db.query(
      "SELECT * FROM slots WHERE doctor_id=$1 AND is_booked=false ORDER BY slot_date, slot_time",
      [doctorId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Book a slot
const bookSlot = async (req, res) => {
  const { slotId, patientId, patientName } = req.body;
  try {
    // Check if slot is already booked
    const slotCheck = await db.query("SELECT is_booked FROM slots WHERE id=$1", [slotId]);
    if (!slotCheck.rows[0]) return res.status(404).json({ message: "Slot not found" });
    if (slotCheck.rows[0].is_booked) return res.status(400).json({ message: "Slot already booked" });

    // Mark slot as booked
    await db.query("UPDATE slots SET is_booked=true WHERE id=$1", [slotId]);

    // Store appointment
    await db.query(
      "INSERT INTO appointments (slot_id, patient_id, patient_name) VALUES ($1, $2, $3)",
      [slotId, patientId, patientName]
    );

    res.json({ message: "Slot booked successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getSlotsByDoctor, bookSlot };