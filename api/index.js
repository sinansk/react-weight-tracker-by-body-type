require("dotenv").config();
const express = require('express');
const app = express();
const cors = require("cors");
const authRoute = require("./routes/authRoutes");
const searchFood = require("./routes/searchFood");
app.use(cors());
app.use(express.json());


app.use("/api/auth", authRoute);
app.use("/api/search-food", searchFood);

app.listen(process.env.PORT || 5000, () => {
    console.log("Backend server is running!");
});