const express = require("express");
const { calculateMacro } = require("../controllers/calculateMacroController");
const router = express.Router();

router.get("/", calculateMacro);

module.exports = router;
