const mongoose = require("mongoose");

const courseEnrollmentSchema = new mongoose.Schema(
    {
        child: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Child",
            required: true
        },

        course: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
            required: true
        },

        status: {
            type: String,
            enum: [
                "enrolled",
                "in-progress",
                "completed",
                "cancelled"
            ],
            default: "enrolled"
        },

        progress: {
            type: Number,
            default: 0,
            min: 0,
            max: 100
        },

        enrolledAt: {
            type: Date,
            default: Date.now
        },

        completedAt: {
            type: Date
        }
    },
    {
        timestamps: true
    }
);

module.exports =
    mongoose.model(
        "CourseEnrollment",
        courseEnrollmentSchema
    );