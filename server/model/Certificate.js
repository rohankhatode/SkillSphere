const mongoose = require("mongoose");

const certificateSchema = new mongoose.Schema(
    {
        child: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Child",
            required: true
        },

        title: {
            type: String,
            required: true
        },

        course: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
            default: null
        },

        certificateUrl: {
            type: String,
            default: ""
        },

        issuedAt: {
            type: Date,
            default: Date.now
        }
    },
    {
        timestamps: true
    }
);

module.exports =
    mongoose.model("Certificate", certificateSchema);