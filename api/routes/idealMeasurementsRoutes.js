const express = require("express");
const {
  idealMeasurements,
} = require("../controllers/idealMeasurementsController");
const router = express.Router();

router.get("/", idealMeasurements);

module.exports = router;
