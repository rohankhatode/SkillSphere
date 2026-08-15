const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  createExam,
  getAllExams,
  getExamById,
  getUpcomingExams,
  getExamInformation,
  startExam,
  updateExam,
  deleteExam,
} = require("../controllers/examController");


// =====================================================
// ADMIN / CREATE
// =====================================================

router.post(
  "/",
  authMiddleware,
  createExam
);


// =====================================================
// GET ALL EXAMS
// =====================================================

router.get(
  "/",
  authMiddleware,
  getAllExams
);


// =====================================================
// UPCOMING EXAMS FOR CHILD
// =====================================================

router.get(
  "/upcoming/:childId",
  authMiddleware,
  getUpcomingExams
);

// =====================================================
// GET EXAM INFORMATION FOR CHILD
// =====================================================

router.get(
    "/:examId/:childId",
    authMiddleware,
    getExamInformation
);

// =====================================================
// START EXAM
// =====================================================

router.post(
    "/:examId/:childId/start",
    authMiddleware,
    startExam
);

// =====================================================
// GET SINGLE EXAM
// =====================================================

router.get(
  "/:id",
  authMiddleware,
  getExamById
);


// =====================================================
// UPDATE EXAM
// =====================================================

router.put(
  "/:id",
  authMiddleware,
  updateExam
);


// =====================================================
// DELETE EXAM
// =====================================================

router.delete(
  "/:id",
  authMiddleware,
  deleteExam
);


module.exports = router;