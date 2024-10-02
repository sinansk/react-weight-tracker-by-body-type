require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const authRoute = require("./routes/authRoutes");
const searchFood = require("./routes/searchFood");
const idealWeight = require("./routes/idealWeightRoutes");
const dailycalorie = require("./routes/dailiyCalorieRoutes");
const bodyFat = require("./routes/bodyFatRoutes");
const calculateMacro = require("./routes/calculateMacroRoutes");
const idealMeasurements = require("./routes/idealMeasurementsRoutes");

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/search-food", searchFood);
app.use("/api/ideal-weight", idealWeight);
app.use("/api/daily-calorie", dailycalorie);
app.use("/api/body-fat", bodyFat);
app.use("/api/macro-calculator", calculateMacro);
app.use("/api/ideal-measurements", idealMeasurements);

app.listen(process.env.PORT || 5000, () => {
  console.log("Backend server is running!");
});
