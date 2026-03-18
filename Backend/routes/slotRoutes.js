const router = require("express").Router();
const { getSlotsByDoctor } = require("../controllers/slotController");

router.get("/:doctorId", getSlotsByDoctor);

module.exports = router;