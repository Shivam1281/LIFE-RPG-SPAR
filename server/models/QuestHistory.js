const mongoose = require("mongoose");

const questHistorySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    questId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quest",
      required: true,
    },

    questTitle: {
      type: String,
      required: true,
    },

    xpEarned: {
      type: Number,
      required: true,
    },

    coinsEarned: {
      type: Number,
      required: true,
    },

    completedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("QuestHistory", questHistorySchema);