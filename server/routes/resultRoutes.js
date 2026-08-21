const express = require("express");

const router = express.Router();

const {
  createResult,
  saveAnswer,
  clearAnswer,
  getResult,
  getResultsByChild,
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

//CLEAR ANSWER
router.delete(
  "/:resultId/answers/:questionId",
  authMiddleware,
  clearAnswer
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

//RESULT BY CHILDID
router.get(
  "/child/:childId",
  authMiddleware,
  getResultsByChild
);

module.exports = router;