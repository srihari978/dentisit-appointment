const db = require("../config/db");

// BOOK APPOINTMENT
const bookAppointment = async (req, res) => {
  try {
    const userId = req.user.id;
    const { slotId, patient_name, age, gender } = req.body;
    console.log(slotId);
    // Fetch the slot
    const slotResult = await db.query("SELECT * FROM slots WHERE id=$1", [slotId]);
    if (slotResult.rows.length === 0) {
      return res.status(404).json({ message: "Slot not found" });
    }

    const slot = slotResult.rows[0];

    // Check if slot is already booked
    if (slot.is_booked) {
      return res.status(400).json({ message: "Already booked" });
    }

    // Ensure slot_time has seconds (HH:MM:SS)
    let slotTime = slot.slot_time;
    if (!/^\d{2}:\d{2}:\d{2}$/.test(slotTime)) {
      slotTime += ":00"; // append seconds if missing
    }

    // Combine date and time
    const slotDateTimeString = `${slot.slot_date}T${slotTime}`;
    const appointmentDate = new Date(slotDateTimeString);

    // Validate date
    if (isNaN(appointmentDate.getTime())) {
      return res.status(400).json({ message: "Invalid slot date or time" });
    }

    // Insert appointment
    await db.query(
      `INSERT INTO appointments 
       (user_id, doctor_id, patient_name, age, gender, date)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [
        userId,
        slot.doctor_id,
        patient_name,
        age,
        gender,
        appointmentDate.toISOString(),
      ]
    );

    // Mark slot as booked
    await db.query("UPDATE slots SET is_booked=true WHERE id=$1", [slotId]);

    res.json({ message: "Booked successfully" });
  } catch (err) {
    console.error("Booking error:", err);
    res.status(500).json({ message: "Booking failed", error: err.message });
  }
};

// GET USER APPOINTMENTS
const getAppointments = async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await db.query(
      `SELECT a.*, d.name as doctor_name 
       FROM appointments a
       JOIN doctors d ON a.doctor_id = d.id
       WHERE a.user_id = $1
       ORDER BY a.date ASC`,
      [userId]
    );

    res.json(result.rows);
  } catch (err) {
    console.error("Fetch appointments error:", err);
    res.status(500).json({ message: "Failed to fetch appointments", error: err.message });
  }
};

module.exports = { bookAppointment, getAppointments };