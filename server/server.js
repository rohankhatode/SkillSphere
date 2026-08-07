require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const childRoutes=require("./routes/childRoutes");
const app = express();
const dns = require("dns");
// Change DNS
dns.setServers(["1.1.1.1", "8.8.8.8"]);

// Middleware
app.use(express.json());

const allowedOrigins = [
  "http://localhost:3000",
  "https://skill-sphere-b4v2.vercel.app",
];

app.use(
    cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// Health Check
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "SkillSphere API is running",
    });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/child",childRoutes);

// 404 Handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
    });
});



const PORT = process.env.PORT || 5000;

// Start Server
const startServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });

    } catch (err) {
        console.error("Failed to start server:", err.message);
        process.exit(1);
    }
};

startServer();