const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    getDashboardOverview,
    getAccountDetails,
    updateAccountDetails
} = require("../controllers/dashboardController");

router.get("/test", (req, res) => {
    res.json({
        success: true,
        message: "Dashboard routes are working"
    });
});

router.get(
    "/overview/:childId",
    authMiddleware,
    getDashboardOverview
);


router.get(
    "/account/:childId",
    authMiddleware,
    getAccountDetails
);

router.put(
    "/account/:childId",
    authMiddleware,
    updateAccountDetails
);

module.exports = router;