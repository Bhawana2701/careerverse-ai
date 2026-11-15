
const express = require("express");
const { generateQuiz } = require("../services/quizGenerator");
const pool = require("../config/database");

const router = express.Router();

// Generate a new AI quiz
router.post("/generate", async (req, res) => {
  try {
    const { career, milestone_number, topic_name, difficulty } = req.body;

    if (!career || !milestone_number || !topic_name) {
      return res.status(400).json({
        status: "error",
        message: "career, milestone_number, and topic_name are required",
      });
    }

    const milestoneNumber = Number(milestone_number);

    if (!Number.isInteger(milestoneNumber) || milestoneNumber < 1) {
      return res.status(400).json({
        status: "error",
        message: "Invalid milestone number",
      });
    }

    const result = await generateQuiz(
      career,
      milestoneNumber,
      topic_name,
      difficulty || "beginner"
    );

    res.status(201).json({
      status: "success",
      message: "New AI quiz generated successfully",
      ...result,
    });
  } catch (error) {
    console.error("Error generating quiz:", error);

    res.status(500).json({
      status: "error",
      message: "Failed to generate quiz. Please try again later.",
    });
  }
});

// Submit a quiz attempt and save the result
router.post("/:quizId/submit", async (req, res) => {
  try {
    const { user_id, answers, time_taken_seconds } = req.body;
    const quizId = Number(req.params.quizId);

    if (
      !Number.isInteger(quizId) ||
      quizId < 1 ||
      !user_id ||
      !Array.isArray(answers)
    ) {
      return res.status(400).json({
        status: "error",
        message: "Invalid quiz submission",
      });
    }

    const quizResult = await pool.query(
      "SELECT * FROM generated_quizzes WHERE id = $1",
      [quizId]
    );

    if (quizResult.rows.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "Quiz not found",
      });
    }

    const quiz = quizResult.rows[0];
    const questions = quiz.questions;

    if (answers.length !== questions.length) {
      return res.status(400).json({
        status: "error",
        message: "Please answer all questions",
      });
    }

    const submittedAnswers = [];
    let correctAnswers = 0;

    questions.forEach((question, index) => {
      const submitted = answers.find(
        (answer) => answer.question_id === index + 1
      );

      const selectedAnswer = submitted?.selected_answer || "";
      const isCorrect = selectedAnswer === question.correct_answer;

      if (isCorrect) correctAnswers++;

      submittedAnswers.push({
        question_id: index + 1,
        question: question.question,
        selected_answer: selectedAnswer,
        correct_answer: question.correct_answer,
        is_correct: isCorrect,
        explanation: question.explanation,
      });
    });

    const score = (correctAnswers / questions.length) * 100;

    const result = await pool.query(
      `INSERT INTO quiz_attempts
        (user_id, quiz_id, total_questions, correct_answers,
         score, answers, time_taken_seconds)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [
        user_id,
        quizId,
        questions.length,
        correctAnswers,
        score,
        JSON.stringify(submittedAnswers),
        Math.max(0, Number(time_taken_seconds) || 0),
      ]
    );

    res.status(201).json({
      status: "success",
      message: "Quiz attempt saved successfully",
      attempt: result.rows[0],
    });
  } catch (error) {
    console.error("Error submitting quiz:", error);

    res.status(500).json({
      status: "error",
      message: "Failed to save quiz attempt",
    });
  }
});


// Get a student's previous quiz attempts
router.get("/history/:userId", async (req, res) => {
  try {
    const userId = Number(req.params.userId);

    if (!Number.isInteger(userId) || userId < 1) {
      return res.status(400).json({
        status: "error",
        message: "Invalid user ID",
      });
    }


    const result = await pool.query(
    `SELECT
        qa.id AS attempt_id,
        qa.quiz_id,
        qa.total_questions,
        qa.correct_answers,
        qa.score,
        qa.answers,
        qa.time_taken_seconds,
        qa.attempted_at,
        gq.career,
        gq.milestone_number,
        gq.topic_name,
        gq.difficulty,
        gq.questions
    FROM quiz_attempts qa
    JOIN generated_quizzes gq ON qa.quiz_id = gq.id
    WHERE qa.user_id = $1
    ORDER BY qa.attempted_at DESC`,
    [userId]
    );


    res.json({
      status: "success",
      attempts: result.rows,
    });
  } catch (error) {
    console.error("Error fetching quiz history:", error);

    res.status(500).json({
      status: "error",
      message: "Failed to fetch quiz history",
    });
  }
});

module.exports = router;
