const db = require("../config/db");

const getDoctors = async (req, res) => {
  const result = await db.query("SELECT * FROM doctors ORDER BY name");
  res.json(result.rows);
};

module.exports = { getDoctors };