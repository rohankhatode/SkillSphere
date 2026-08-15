const mongoose = require("mongoose");

const examResultSchema = new mongoose.Schema(
    {
        exam: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Exam",
            required: true
        },

        child: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Child",
            required: true
        },

        score: {
            type: Number,
            default: 0
        },

        totalMarks: {
            type: Number,
            default: 0
        },

        percentage: {
            type: Number,
            default: 0
        },

        correctAnswers: {
            type: Number,
            default: 0
        },

        wrongAnswers: {
            type: Number,
            default: 0
        },

        unanswered: {
            type: Number,
            default: 0
        },

        passed: {
            type: Boolean,
            default: false
        },

        startedAt: {
            type: Date
        },

        submittedAt: {
            type: Date
        }
    },
    {
        timestamps: true
    }
);
examResultSchema.index(
    { exam: 1, child: 1 },
    { unique: true }
);

module.exports =
    mongoose.model("ExamResult", examResultSchema);