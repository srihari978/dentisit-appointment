const express = require("express");
const router = express.Router();
const { getSlotsByDoctor, bookSlot } = require("../controllers/slotController");

// Get available slots for a doctor
router.get("/:doctorId", getSlotsByDoctor);

// Book a slot
router.post("/book", bookSlot);

module.exports = router;