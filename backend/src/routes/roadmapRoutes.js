const express = require("express");
const roadmapController = require("../controllers/roadmapController");

const router = express.Router();

router.get("/:career", roadmapController.getCareerRoadmap);

module.exports = router;