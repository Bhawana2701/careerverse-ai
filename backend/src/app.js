const express = require("express");
const cors = require("cors");
const pool = require("./config/database");
const userRoutes = require("./routes/userRoutes");

const app = express();

const PORT = process.env.PORT || 8080;

// Middleware
// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);

app.get("/api/health", (req, res) => {
  res.json({
    status: "success",
    message: "CareerVerse AI backend is running!",
  });
});

app.get("/api/db-test", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");

    res.json({
      status: "success",
      message: "Database connection successful!",
      databaseTime: result.rows[0].now,
    });
  } catch (error) {
    console.error("Database connection error:", error);

    res.status(500).json({
      status: "error",
      message: "Database connection failed",
    });
  }
});

app.listen(PORT, () => {
  console.log(`CareerVerse AI backend running on http://localhost:${PORT}`);
});