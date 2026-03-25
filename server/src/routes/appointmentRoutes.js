const express = require("express");
const {
  createAppointment,
  getMyAppointments,
  getAllAppointments,
} = require("../controllers/appointmentController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createAppointment);
router.get("/me", protect, getMyAppointments);
router.get("/admin", protect, adminOnly, getAllAppointments);

module.exports = router;