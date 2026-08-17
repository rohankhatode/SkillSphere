const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

const { addChild, getMyChildren,updateInterests, updateGoals } = require("../controllers/childController");

router.post("/add",authMiddleware,addChild);
// Get logged-in parent's children
router.get("/my-children",authMiddleware,getMyChildren);
router.put("/interests/:id",authMiddleware, updateInterests);
router.put("/goals/:id",authMiddleware, updateGoals);

module.exports=router;