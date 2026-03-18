const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// REGISTER
const register = async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword)
    return res.status(400).json({ message: "Passwords do not match" });

  const hashed = await bcrypt.hash(password, 10);

  const user = await db.query(
    "INSERT INTO users (username, email, password) VALUES ($1,$2,$3) RETURNING *",
    [username, email, hashed]
  );

  res.json(user.rows[0]);
};

// LOGIN
const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await db.query("SELECT * FROM users WHERE email=$1", [email]);

  if (user.rows.length === 0)
    return res.status(400).json({ message: "User not found" });

  const valid = await bcrypt.compare(password, user.rows[0].password);

  if (!valid) return res.status(400).json({ message: "Invalid password" });

  const token = jwt.sign(
    { id: user.rows[0].id },
    process.env.JWT_SECRET
  );

  res.json({ token });
};

module.exports = { register, login };