const express = require("express");

const {
  getQuests,
  createQuest,
  completeQuest,
} = require("../controllers/questController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Get all quests
router.get("/", protect, getQuests);

// Create new quest
router.post("/", protect, createQuest);

// Complete quest
router.put("/:id/complete", protect, completeQuest);

module.exports = router;