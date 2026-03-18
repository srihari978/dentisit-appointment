const router = require("express").Router();
const { getDoctors } = require("../controllers/doctorController");

router.get("/", getDoctors);

module.exports = router;