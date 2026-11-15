const openai = require("./config/openai");

async function testOpenAI() {
  try {
    console.log("Testing OpenAI connection...");

    const response = await openai.responses.create({
      model: "gpt-4.1-mini",
      input: "Reply with exactly: CareerVerse AI connection successful!",
    });

    console.log("AI response:", response.output_text);
  } catch (error) {
    console.error("OpenAI connection failed.");

    if (error.status) {
      console.error("Status:", error.status);
    }

    console.error("Error:", error.message);
  }
}

testOpenAI();