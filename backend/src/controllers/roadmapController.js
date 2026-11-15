const roadmapService = require("../services/roadmapService");

const getCareerRoadmap = (req, res) => {
  const { career } = req.params;

  const roadmap = roadmapService.getCareerRoadmap(career);

  if (!roadmap) {
    return res.status(404).json({
      message: "Roadmap not found for this career.",
    });
  }

  res.json(roadmap);
};

module.exports = {
  getCareerRoadmap,
};