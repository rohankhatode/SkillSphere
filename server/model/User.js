const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    fullName: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },

    phoneNumber: {
        type: String,
        default: ""
    },

    phoneVerified: {
        type: Boolean,
        default: false
    },

    password: {
        type: String,
        default: ""
    },

    provider: {
        type: String,
        enum: ["local", "google", "apple"],
        default: "local"
    },

    profilePicture: {
        type: String,
        default: ""
    }

},
{
    timestamps: true
});

const User = mongoose.model("User", userSchema);

module.exports = User;