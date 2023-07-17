const express = require('express');
const app = express();
const cors = require("cors");
const authRoute = require("./routes/authRoutes")

app.use(cors());
app.use(express.json());

app.use("/auth", authRoute);


app.listen(process.env.PORT || 5000, () => {
    console.log("Backend server is running!");
});