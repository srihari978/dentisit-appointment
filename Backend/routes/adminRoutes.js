const router = require("express").Router();
const {
  adminLogin,
  addDoctor,
  addSlot,
  getDoctors
} = require("../controllers/adminController");

router.post("/login", adminLogin);
router.post("/doctor", addDoctor);
router.post("/slot", addSlot);
router.get("/doctors", getDoctors);

module.exports = router;