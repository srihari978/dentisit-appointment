const router = require("express").Router();
const auth = require("../middleware/authMiddleware");

const {
  bookAppointment,
  getAppointments
} = require("../controllers/appointmentController");

router.post("/book", auth, bookAppointment);
router.get("/my", auth, getAppointments);

module.exports = router;