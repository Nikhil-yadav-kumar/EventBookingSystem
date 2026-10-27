const express = require("express");
const cors = require("cors");
const eventRoutes = require("./routes/eventRoutes");

const connectDB = require("./config/db");

const dotenv = require("dotenv");
dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/events", eventRoutes);
app.get("/", (req, res) => {
  res.send("Welcome to the Event Booking System API");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
