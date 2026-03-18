const express = require("express");
const router = express.Router();
const { addSlot, getSlots } = require("../controllers/slotController");

// slot routes
router.post("/add-slot", addSlot);
router.get("/slots/:doctorId", getSlots);

module.exports = router;