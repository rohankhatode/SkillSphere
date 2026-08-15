const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    // ==========================================
    // EXAM
    // ==========================================

    exam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Exam",
      required: true,
    },

    // ==========================================
    // QUESTION
    // ==========================================

    questionText: {
      type: String,
      required: true,
      trim: true,
    },

    // ==========================================
    // MCQ OPTIONS
    // ==========================================

    options: {
      type: [String],
      required: true,
      validate: {
        validator: function (value) {
          return Array.isArray(value) && value.length === 4;
        },
        message: "MCQ must have exactly 4 options",
      },
    },

    // ==========================================
    // CORRECT ANSWER
    // 0 = option 1
    // 1 = option 2
    // 2 = option 3
    // 3 = option 4
    // ==========================================

    correctAnswer: {
      type: Number,
      required: true,
      min: 0,
      max: 3,
    },

    // ==========================================
    // MARKS
    // ==========================================

    marks: {
      type: Number,
      default: 1,
      min: 1,
    },

    // ==========================================
    // QUESTION ORDER
    // ==========================================

    order: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Question", questionSchema);