const careerRoadmaps = require("../data/careerRoadmaps");

const getCareerRoadmap = (career) => {
  return careerRoadmaps[career] || null;
};

module.exports = {
  getCareerRoadmap,
};