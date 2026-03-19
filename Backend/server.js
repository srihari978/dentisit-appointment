const express = require("express");
const cors = require("cors");
require("dotenv").config();
const db = require("./config/db"); // ✅ IMPORT DB

const app = express();
app.use(cors());
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173"
}));
// ✅ DB CONNECTION TEST FUNCTION
const testDB = async () => {
  try {
    const result = await db.query("SELECT NOW()");
    console.log("✅ DB Connected:", result.rows[0]);
  } catch (err) {
    console.error("❌ DB Connection Failed:", err.message);
  }
};

// ✅ CALL FUNCTION
testDB();

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/doctors", require("./routes/doctorRoutes"));
app.use("/api/slots", require("./routes/slotRoutes"));
app.use("/api/appointments", require("./routes/appointmentRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));

app.listen(5000, () => console.log("🚀 Server running on 5000"));