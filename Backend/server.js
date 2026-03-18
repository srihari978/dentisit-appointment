const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/doctors", require("./routes/doctorRoutes"));
app.use("/api/slots", require("./routes/slotRoutes"));
app.use("/api/appointments", require("./routes/appointmentRoutes"));

app.listen(5000, () => console.log("Server running on 5000"));