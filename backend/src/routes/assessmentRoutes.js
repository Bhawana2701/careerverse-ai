const express = require("express");
const pool = require("../config/database");

const router = express.Router();
// Get assessment questions for a topic
router.get("/", async (req, res) => {
  try {
    const { career, milestone_number, topic_name } = req.query;

    if (!career || !milestone_number || !topic_name) {
      return res.status(400).json({
        status: "error",
        message: "career, milestone_number, and topic_name are required",
      });
    }

    const result = await pool.query(
      `SELECT id, career, milestone_number, topic_name,
              question, question_type, options, difficulty
       FROM topic_assessments
       WHERE career = $1
         AND milestone_number = $2
         AND topic_name = $3
       ORDER BY id`,
      [career, Number(milestone_number), topic_name]
    );

    res.json({
      status: "success",
      questions: result.rows,
    });
  } catch (error) {
    console.error("Error fetching assessment questions:", error);

    res.status(500).json({
      status: "error",
      message: "Failed to fetch assessment questions",
    });
  }
});