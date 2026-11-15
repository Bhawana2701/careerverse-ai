const express = require("express");
const aiController = require("../controllers/aiController");

const router = express.Router();

router.post("/mentor", aiController.mentorChat);

module.exports = router;