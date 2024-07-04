const express = require("express");
const cors = require("cors");
const connectDB = require("./src/config/db.js");
const authRoutes = require("./src/routes/authRoutes.js");
const todoRoutes = require("./src/routes/todoRoutes.js");
const noteRoutes = require("./src/routes/noteRoutes.js");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// Connect to database
connectDB();

app.use(cors());
// Middleware
app.use(express.json());

// Routes
app.use("/", authRoutes);
app.use("/", todoRoutes);
app.use("/", noteRoutes);
app.get("/", (req, res) => res.send("Hello"));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
