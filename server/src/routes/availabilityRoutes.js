const express = require("express");
const {
  getAvailability,
  createAvailability,
} = require("../controllers/availabilityController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getAvailability);
router.post("/", protect, adminOnly, createAvailability);

module.exports = router;