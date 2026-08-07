const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        console.log("MONGO_URI:", process.env.MONGO_URI);
        const conn = await mongoose.connect(process.env.MONGO_URI);

        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);

        mongoose.connection.on("disconnected", () => {
            console.log("⚠ MongoDB Disconnected");
        });

        mongoose.connection.on("reconnected", () => {
            console.log("✅ MongoDB Reconnected");
        });

        mongoose.connection.on("error", (err) => {
            console.error("MongoDB Error:", err.message);
        });

    } catch (err) {
        console.error("❌ MongoDB Connection Failed:", err.message);
        process.exit(1);
    }
};

module.exports = connectDB;