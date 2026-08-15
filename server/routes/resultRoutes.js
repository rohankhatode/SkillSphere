const express = require("express");

const router = express.Router();

const {
  createResult,
  saveAnswer,
  getResult,
  submitResult,
} = require("../controllers/resultController");

const authMiddleware = require("../middleware/authMiddleware");

// CREATE / START RESULT
router.post(
  "/",
  authMiddleware,
  createResult
);

// SAVE ANSWER
router.put(
  "/:resultId/answers",
  authMiddleware,
  saveAnswer
);

// SUBMIT EXAM
router.put(
  "/:resultId/submit",
  authMiddleware,
  submitResult
);

// GET RESULT
router.get(
  "/:resultId",
  authMiddleware,
  getResult
);

module.exports = router;