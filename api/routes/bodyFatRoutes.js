const express = require("express");
const { calculateBodyFat } = require("../controllers/bodyFatController");
const router = express.Router();

router.get("/", calculateBodyFat);

module.exports = router;
