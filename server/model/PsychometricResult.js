const mongoose = require("mongoose");

const psychometricResultSchema = new mongoose.Schema(
  {
    child: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Child",
      required: true,
      unique: true,
    },

    overallScore: {
      type: Number,
      default: 0,
    },

    creativity: {
      type: Number,
      default: 0,
    },

    problemSolving: {
      type: Number,
      default: 0,
    },

    communication: {
      type: Number,
      default: 0,
    },

    leadership: {
      type: Number,
      default: 0,
    },

    innovation: {
      type: Number,
      default: 0,
    },

    logicalThinking: {
      type: Number,
      default: 0,
    },

    focus: {
      type: Number,
      default: 0,
    },

    collaboration: {
      type: Number,
      default: 0,
    },

    personality: {
      type: String,
      default: "",
    },

    personalityDescription: {
      type: String,
      default: "",
    },

    learningStyle: {
      type: String,
      default: "",
    },

    learningStyleDescription: {
      type: String,
      default: "",
    },

    strongestSkill: {
      type: String,
      default: "",
    },

    strongestSkillScore: {
      type: Number,
      default: 0,
    },

    careerInterest: {
      type: String,
      default: "",
    },

    careerInterestDescription: {
      type: String,
      default: "",
    },

    aiInsight: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "PsychometricResult",
  psychometricResultSchema
);