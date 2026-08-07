const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

const { addChild, updateInterests, updateGoals } = require("../controllers/childController");

router.post("/add",authMiddleware,addChild);
router.put("/interests/:id", updateInterests);
router.put("/goals/:id", updateGoals);

module.exports=router;