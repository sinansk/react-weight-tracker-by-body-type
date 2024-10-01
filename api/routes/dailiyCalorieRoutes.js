const express = require("express");
const {
  calculateDailyCalorie,
} = require("../controllers/dailyCalorieController");
const router = express.Router();

router.get("/", calculateDailyCalorie);

module.exports = router;
