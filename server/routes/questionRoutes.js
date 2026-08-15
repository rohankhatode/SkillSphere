const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  createQuestion,
  getQuestionsByExam,
  getQuestionById,
  updateQuestion,
  deleteQuestion,
} = require("../controllers/questionController");

// =====================================================
// CREATE QUESTION
// =====================================================

router.post(
  "/",
  authMiddleware,
  createQuestion
);

// =====================================================
// GET QUESTIONS FOR EXAM
// =====================================================

router.get(
  "/exam/:examId",
  authMiddleware,
  getQuestionsByExam
);

// =====================================================
// GET SINGLE QUESTION
// =====================================================

router.get(
  "/:id",
  authMiddleware,
  getQuestionById
);

// =====================================================
// UPDATE QUESTION
// =====================================================

router.put(
  "/:id",
  authMiddleware,
  updateQuestion
);

// =====================================================
// DELETE QUESTION
// =====================================================

router.delete(
  "/:id",
  authMiddleware,
  deleteQuestion
);

module.exports = router;