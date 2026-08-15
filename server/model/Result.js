const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema(
  {
    exam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Exam",
      required: true,
    },

    child: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Child",
      required: true,
    },

    answers: [
      {
        question: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Question",
          required: true,
        },

        selectedAnswer: {
          type: Number,
          required: false,
        },

        isCorrect: {
          type: Boolean,
          default: false,
        },

        marksObtained: {
          type: Number,
          default: 0,
        },
      },
    ],

    totalQuestions: {
      type: Number,
      default: 0,
    },

    attemptedQuestions: {
      type: Number,
      default: 0,
    },

    score: {
      type: Number,
      default: 0,
    },

    percentage: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: ["not-started", "in-progress", "completed"],
      default: "not-started",
    },

    startedAt: {
      type: Date,
    },

    submittedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Result", resultSchema);