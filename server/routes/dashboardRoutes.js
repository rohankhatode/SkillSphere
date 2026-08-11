const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    getDashboardOverview,
    getAccountDetails
} = require("../controllers/dashboardController");


// Dashboard Overview
router.get(
    "/overview",
    authMiddleware,
    getDashboardOverview
);


// Account Details
router.get(
    "/account",
    authMiddleware,
    getAccountDetails
);


module.exports = router;