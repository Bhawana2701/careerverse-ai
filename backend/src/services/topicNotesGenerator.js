const careerRoadmaps = require("../data/careerRoadmaps");
const pool = require("../config/database");
const gemini = require("../config/gemini");

// Create the prompt that Gemini will use to generate revision notes
function createNotesPrompt(career, milestoneTitle, topicName) {
  return `
You are an expert computer science teacher creating revision notes for B.Tech students.

Create detailed, beginner-friendly revision notes for the following topic:

Career: ${career}
Milestone: ${milestoneTitle}
Topic: ${topicName}

Return ONLY valid JSON in exactly this structure:

{
  "explanation": "A clear and detailed explanation of the topic.",
  "key_points": [
    "Important concept 1",
    "Important concept 2"
  ],
  "examples": [
    {
      "title": "Example title",
      "code": "Example code with explanation in comments"
    }
  ],
  "practice_questions": [
    "Practice question 1",
    "Practice question 2"
  ],
  "resources": [
    {
      "title": "Official learning resource",
      "url": "https://example.com"
    }
  ]
}

Requirements:
- Explain concepts from beginner to intermediate level.
- Use simple language suitable for B.Tech students.
- Include at least 5 key points.
- Include at least 2 practical examples where applicable.
- Include at least 5 practice questions.
- Prefer official documentation and well-known educational resources.
- Do not invent resource URLs. If you are unsure of a URL, use an empty string.
- Return JSON only. Do not include Markdown or additional text.
`;
}

// Generate revision notes using Gemini AI
async function generateTopicNotes(career, milestoneTitle, topicName) {
  const prompt = createNotesPrompt(career, milestoneTitle, topicName);

  const response = await gemini.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
    },
  });

  const generatedText = response.text;

  if (!generatedText) {
    throw new Error("Gemini returned an empty response.");
  }

  return JSON.parse(generatedText);
}

// Save generated revision notes in PostgreSQL
async function saveTopicNotes(
  career,
  milestoneNumber,
  milestoneTitle,
  topicName,
  notes
) {
  await pool.query(
    `INSERT INTO topic_notes
    (
      career,
      milestone_number,
      milestone_title,
      topic_name,
      explanation,
      key_points,
      examples,
      practice_questions,
      resources
    )
    VALUES ($1, $2, $3, $4, $5, $6::jsonb, $7::jsonb, $8::jsonb, $9::jsonb)
    ON CONFLICT (career, milestone_number, topic_name)
    DO NOTHING`,
    [
      career,
      milestoneNumber,
      milestoneTitle,
      topicName,
      notes.explanation,
      JSON.stringify(notes.key_points),
      JSON.stringify(notes.examples),
      JSON.stringify(notes.practice_questions),
      JSON.stringify(notes.resources),
    ]
  );
}

// Check whether revision notes already exist for a topic
async function topicNotesExist(career, milestoneNumber, topicName) {
  const result = await pool.query(
    `SELECT id
     FROM topic_notes
     WHERE career = $1
       AND milestone_number = $2
       AND topic_name = $3`,
    [career, milestoneNumber, topicName]
  );

  return result.rows.length > 0;
}
// Generate and save notes for topics in the career roadmap
async function runTopicNotesGenerator(limit = 1) {
  let generatedCount = 0;
  let skippedCount = 0;
  let attemptedCount = 0;

  for (const [career, careerData] of Object.entries(careerRoadmaps)) {
    for (const step of careerData.steps) {
      for (const topic of step.whatToLearn) {

        // Stop after reaching the requested limit
        if (attemptedCount >= limit) {
          console.log("Generation limit reached.");
          console.log(`Generated: ${generatedCount}`);
          console.log(`Skipped: ${skippedCount}`);
          return;
        }

        // Check whether notes already exist
        const exists = await topicNotesExist(
          career,
          step.stepNumber,
          topic
        );

        if (exists) {
          console.log(`Skipping existing notes: ${topic}`);
          skippedCount++;
          continue;
        }

        attemptedCount++;

        try {
        console.log(`Generating notes for: ${topic}`);

          const notes = await generateTopicNotes(
            career,
            step.title,
            topic
          );

          // Check that Gemini returned the expected data
          if (
            typeof notes.explanation !== "string" ||
            !Array.isArray(notes.key_points) ||
            !Array.isArray(notes.examples) ||
            !Array.isArray(notes.practice_questions) ||
            !Array.isArray(notes.resources)
          ) {
            throw new Error("Gemini returned an invalid notes structure.");
          }

          await saveTopicNotes(
            career,
            step.stepNumber,
            step.title,
            topic,
            notes
          );

          console.log(`Saved notes successfully: ${topic}`);
          generatedCount++;

          // Small delay between AI requests
          await new Promise(resolve => setTimeout(resolve, 1500));

        } catch (error) {
          console.error(`Failed to generate notes for ${topic}:`, error.message);
        }
      }
    }
  }

  console.log("Topic notes generation completed.");
  console.log(`Generated: ${generatedCount}`);
  console.log(`Skipped: ${skippedCount}`);
}
// Export the generator function
module.exports = {
  runTopicNotesGenerator,
};

// Run this script directly from the terminal
if (require.main === module) {
  const argument = process.argv[2] || "1";

  const limit = argument === "all"
    ? Infinity
    : Number(argument);

  if (!(limit > 0)) {
    console.error("Please provide a valid limit, such as 1, 5, or all.");
    process.exitCode = 1;
    pool.end();
  } else {
    runTopicNotesGenerator(limit)
      .catch((error) => {
        console.error("Generator failed:", error.message);
        process.exitCode = 1;
      })
      .finally(() => {
        pool.end();
      });
  }
}