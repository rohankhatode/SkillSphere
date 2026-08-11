

const mongoose = require("mongoose");

const examResultSchema =
new mongoose.Schema({

    child:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Child"
    },

    exam:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Exam"
    },

    score:Number,

    totalQuestions:Number,

    correctAnswers:Number,

    completedAt:Date

},{
    timestamps:true
});

module.exports =
mongoose.model(
    "ExamResult",
    examResultSchema
);