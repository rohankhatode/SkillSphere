

const mongoose = require("mongoose");

const psychometricSchema = new mongoose.Schema({

    child: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Child"
    },

    creativity: Number,
    problemSolving: Number,
    communication: Number,
    leadership: Number,
    innovation: Number,
    logicalThinking: Number,
    focus: Number,
    collaboration: Number,

    persona: String,

    learningStyle: String,

    strongestSkill: String,

    careerInterest: String,

    aiInsight: String

},{
    timestamps:true
});

module.exports =
mongoose.model(
    "Psychometric",
    psychometricSchema
);