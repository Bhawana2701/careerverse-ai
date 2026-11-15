const aiService = require("../services/aiService");

const mentorChat = async (req, res) => {
  try {
    const {
        user,
        skills,
        skillGaps,
        careerProgress,
        question,
        selectedCareer,
    } = req.body;

    if (!user || !question) {
      return res.status(400).json({
        status: "error",
        message: "User information and question are required.",
      });
    }

    const answer = await aiService.generateMentorResponse({
        user,
        skills: skills || [],
        skillGaps: skillGaps || [],
        careerProgress: careerProgress || 0,
        question,
        selectedCareer: selectedCareer || null,
    });

    res.json({
      status: "success",
      data: {
        answer,
      },
    });
  } catch (error) {
    console.error("AI Mentor error:", error);

    res.status(500).json({
      status: "error",
      message: "AI Mentor could not generate a response.",
    });
  }
};

module.exports = {
  mentorChat,
};