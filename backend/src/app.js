const express = require("express");
const cors = require("cors");
const pool = require("./config/database");
const userRoutes = require("./routes/userRoutes");
const aiRoutes = require("./routes/aiRoutes");
const skillRoutes = require("./routes/skillRoutes");
const roadmapRoutes = require("./routes/roadmapRoutes");
const topicNotesRoutes = require("./routes/topicNotesRoutes");
const quizRoutes = require("./routes/quizRoutes");
const app = express();

const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/roadmap", roadmapRoutes);
app.use("/api/topic-notes", topicNotesRoutes);
app.use("/api/quizzes", quizRoutes);

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