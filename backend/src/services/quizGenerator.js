
const gemini = require("../config/gemini");
const pool = require("../config/database");

async function generateQuiz(career, milestoneNumber, topicName, difficulty = "beginner") {
  const prompt = `
You are an expert technical assessment creator for a student learning platform.

Create exactly 5 multiple-choice questions about:
Career: ${career}
Milestone: ${milestoneNumber}
Topic: ${topicName}
Difficulty: ${difficulty}

Requirements:
- Questions must test understanding, not just memorization.
- Include practical scenarios and code-output questions where appropriate.
- Each question must have exactly 4 options.
- Only one option must be correct.
- Provide a short explanation of the correct answer.
- Do not repeat the same question.
- Return valid JSON only, with no Markdown.

Use this exact JSON structure:
{
  "questions": [
    {
      "question": "Question text",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correct_answer": "Option A",
      "explanation": "Explanation"
    }
  ]
}
`;

  const response = await gemini.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
    },
  });

  const parsed = JSON.parse(response.text);

  if (!Array.isArray(parsed.questions) || parsed.questions.length !== 5) {
    throw new Error("AI returned an invalid quiz.");
  }

  for (const question of parsed.questions) {
    if (
      typeof question.question !== "string" ||
      !Array.isArray(question.options) ||
      question.options.length !== 4 ||
      !question.options.includes(question.correct_answer) ||
      typeof question.explanation !== "string"
    ) {
      throw new Error("AI returned an invalid question format.");
    }
  }

  const result = await pool.query(
    `INSERT INTO generated_quizzes
      (career, milestone_number, topic_name, difficulty, questions)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING id, career, milestone_number, topic_name, difficulty, created_at`,
    [
      career,
      milestoneNumber,
      topicName,
      difficulty,
      JSON.stringify(parsed.questions),
    ]
  );

  return {
    quiz: result.rows[0],
    questions: parsed.questions.map((question, index) => ({
      id: index + 1,
      question: question.question,
      options: question.options,
    })),
  };
}

module.exports = { generateQuiz };
