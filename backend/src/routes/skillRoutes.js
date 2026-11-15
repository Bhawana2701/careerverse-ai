const express = require("express");

const skillController = require("../controllers/skillController");

const router = express.Router();


router.post(
  "/",
  skillController.createSkill
);


router.get(
  "/user/:userId",
  skillController.getUserSkills
);


router.put(
  "/:id",
  skillController.updateSkillLevel
);


router.delete(
  "/:id",
  skillController.deleteSkill
);


module.exports = router;