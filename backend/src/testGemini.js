
const gemini = require("./config/gemini");

async function testGemini() {
  try {
    console.log("Testing Gemini connection...");

    const response = await gemini.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "Reply with exactly: CareerVerse AI Gemini connection successful!",
    });

    console.log("AI response:", response.text);
  } catch (error) {
    console.error("Gemini connection failed.");
    console.error("Error:", error.message);
  }
}

testGemini();
