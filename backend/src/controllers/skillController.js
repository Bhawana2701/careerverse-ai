const skillService = require("../services/skillService");


const createSkill = async (req, res) => {
  try {
    const {
      userId,
      skillName,
      skillLevel,
    } = req.body;

    if (!userId || !skillName || !skillLevel) {
      return res.status(400).json({
        status: "error",
        message:
          "User ID, skill name, and skill level are required.",
      });
    }

    const skill = await skillService.createSkill({
      userId,
      skillName,
      skillLevel,
    });

    res.status(201).json({
      status: "success",
      data: skill,
    });

  } catch (error) {
    console.error("Create skill error:", error);

    res.status(500).json({
      status: "error",
      message: "Failed to create skill.",
    });
  }
};


const getUserSkills = async (req, res) => {
  try {
    const { userId } = req.params;

    const skills = await skillService.getUserSkills(userId);

    res.json({
      status: "success",
      data: skills,
    });

  } catch (error) {
    console.error("Get skills error:", error);

    res.status(500).json({
      status: "error",
      message: "Failed to fetch skills.",
    });
  }
};


const updateSkillLevel = async (req, res) => {
  try {
    const { id } = req.params;
    const { skillLevel } = req.body;

    if (!skillLevel) {
      return res.status(400).json({
        status: "error",
        message: "Skill level is required.",
      });
    }

    const validLevels = [
      "Beginner",
      "Intermediate",
      "Advanced",
    ];

    if (!validLevels.includes(skillLevel)) {
      return res.status(400).json({
        status: "error",
        message: "Invalid skill level.",
      });
    }

    const skill = await skillService.updateSkillLevel(
      id,
      skillLevel
    );

    if (!skill) {
      return res.status(404).json({
        status: "error",
        message: "Skill not found.",
      });
    }

    res.json({
      status: "success",
      data: skill,
    });

  } catch (error) {
    console.error("Update skill error:", error);

    res.status(500).json({
      status: "error",
      message: "Failed to update skill level.",
    });
  }
};


const deleteSkill = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedSkill = await skillService.deleteSkill(id);

    if (!deletedSkill) {
      return res.status(404).json({
        status: "error",
        message: "Skill not found.",
      });
    }

    res.json({
      status: "success",
      message: "Skill deleted successfully.",
    });

  } catch (error) {
    console.error("Delete skill error:", error);

    res.status(500).json({
      status: "error",
      message: "Failed to delete skill.",
    });
  }
};


module.exports = {
  createSkill,
  getUserSkills,
  updateSkillLevel,
  deleteSkill,
};