require("dotenv").config();
const router = require("express").Router();
const request = require("request");
const { getToken } = require("../requestMethods");

router.get("/", async (req, res) => {
  try {
    const response = await getToken();
    res.status(500).send("You should not to be here :)");
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ error: "An error occurred", message: error.message });
  }
});

module.exports = router;
