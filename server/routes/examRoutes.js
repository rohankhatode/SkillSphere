const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const {
  createExam,
  getAllExams,
  getExamById,
  getUpcomingExams,
  getExamInformation,
  updateExam,
  deleteExam,
} = require("../controllers/examController");


// =====================================================
// ADMIN / CREATE
// =====================================================

router.post(
  "/",
  authMiddleware,
  adminMiddleware,
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
  adminMiddleware,
  updateExam
);


// =====================================================
// DELETE EXAM
// =====================================================

router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  deleteExam
);

module.exports = router;