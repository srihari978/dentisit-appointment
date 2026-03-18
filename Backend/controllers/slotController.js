const db = require("../config/db");

const getSlotsByDoctor = async (req, res) => {
  const { doctorId } = req.params;

  const result = await db.query(
    "SELECT * FROM slots WHERE doctor_id=$1 AND is_booked=false ORDER BY slot_date, slot_time",
    [doctorId]
  );

  res.json(result.rows);
};

module.exports = { getSlotsByDoctor };