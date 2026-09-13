const Quest = require("../models/Quest");
const QuestHistory = require("../models/QuestHistory");
const User = require("../models/User");
const { calculateLevel } = require("../utils/gameLogic");

// =========================
// GET ALL QUESTS
// =========================

const getQuests = async (req, res) => {
  try {
    const quests = await Quest.find({
      userId: req.userId,
    }).sort({ createdAt: -1 });

    res.json({
      quests,
    });
  } catch (error) {
    console.error("Get Quests Error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// =========================
// CREATE QUEST
// =========================

const createQuest = async (req, res) => {
  try {
    const {
      title,
      category,
      difficulty,
      xpReward,
      coinReward,
    } = req.body;

    if (!title) {
      return res.status(400).json({
        message: "Quest title is required",
      });
    }

    const quest = await Quest.create({
      userId: req.userId,
      title,
      category: category || "Other",
      difficulty: difficulty || "Easy",
      xpReward: xpReward || 50,
      coinReward: coinReward || 25,
    });

    res.status(201).json({
      message: "Quest created successfully",
      quest,
    });
  } catch (error) {
    console.error("Create Quest Error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// =========================
// COMPLETE QUEST
// =========================

const completeQuest = async (req, res) => {
  try {
    const quest = await Quest.findOne({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!quest) {
      return res.status(404).json({
        message: "Quest not found",
      });
    }

    if (quest.completed) {
      return res.status(400).json({
        message: "Quest already completed",
      });
    }

    // Mark quest completed
    quest.completed = true;
    quest.completedAt = new Date();

    await quest.save();

    // Find user
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Add XP and coins
    user.xp += quest.xpReward;
    user.coins += quest.coinReward;

    // Calculate new level
    user.level = calculateLevel(user.xp);

    await user.save();

    // Save history
    await QuestHistory.create({
      userId: user._id,
      questId: quest._id,
      questTitle: quest.title,
      xpEarned: quest.xpReward,
      coinsEarned: quest.coinReward,
    });

    res.json({
      message: "Quest completed successfully",

      quest,

      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        xp: user.xp,
        level: user.level,
        coins: user.coins,
        streak: user.streak,
      },
    });
  } catch (error) {
    console.error("Complete Quest Error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = {
  getQuests,
  createQuest,
  completeQuest,
};