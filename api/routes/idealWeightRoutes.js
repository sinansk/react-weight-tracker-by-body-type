const express = require("express");
const {
  calculateIdealWeight,
} = require("../controllers/idealWeightController");
const router = express.Router();

router.get("/", calculateIdealWeight);
module.exports = router;
