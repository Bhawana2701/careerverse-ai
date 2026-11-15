
const express = require("express");
const pool = require("../config/database");

const router = express.Router();

// Get revision notes for a topic
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
      `SELECT *
       FROM topic_notes
       WHERE career = $1
         AND milestone_number = $2
         AND topic_name = $3`,
      [career, Number(milestone_number), topic_name]
    );

    if (result.rows.length === 0) {
      return res.json({
        status: "success",
        notes: null,
        message: "No revision notes have been added for this topic yet.",
      });
    }

    res.json({
      status: "success",
      notes: result.rows[0],
    });
  } catch (error) {
    console.error("Error fetching topic notes:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to fetch topic notes",
    });
  }
});

module.exports = router;
