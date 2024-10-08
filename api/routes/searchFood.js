const router = require("express").Router();
const { searchFoodRequest } = require("../requestMethods");

router.post("/", async (req, res) => {
  const query = req.body.food;
  try {
    const response = await searchFoodRequest(query);
    res.status(200).json(response);
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ error: "An error occurred", message: error.message });
  }
});

module.exports = router;
