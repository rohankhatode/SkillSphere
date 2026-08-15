const Question = require("../model/Question");

// =====================================================
// CREATE QUESTION
// =====================================================

const createQuestion = async (req, res) => {
  try {
    const {
      exam,
      questionText,
      options,
      correctAnswer,
      marks,
      order,
    } = req.body;

    // Required fields
    if (
      !exam ||
      !questionText ||
      !options ||
      correctAnswer === undefined ||
      !order
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required question details",
      });
    }

    // Exactly 4 options
    if (!Array.isArray(options) || options.length !== 4) {
      return res.status(400).json({
        success: false,
        message: "MCQ must have exactly 4 options",
      });
    }

    // Correct answer must be a valid option index
    if (
      typeof correctAnswer !== "number" ||
      correctAnswer < 0 ||
      correctAnswer > 3
    ) {
      return res.status(400).json({
        success: false,
        message: "Correct answer must be an option index from 0 to 3",
      });
    }

    const question = await Question.create({
      exam,
      questionText,
      options,
      correctAnswer,
      marks: marks || 1,
      order,
    });

    res.status(201).json({
      success: true,
      message: "Question created successfully",
      question,
    });
  } catch (error) {
    console.error("Create Question Error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to create question",
    });
  }
};

// =====================================================
// GET QUESTIONS FOR EXAM
// =====================================================

const getQuestionsByExam = async (req, res) => {
  try {
    const { examId } = req.params;

    const questions = await Question.find({
      exam: examId,
    })
      .select("-correctAnswer")
      .sort({ order: 1 });

    res.status(200).json({
      success: true,
      count: questions.length,
      questions,
    });
  } catch (error) {
    console.error("Get Questions Error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch questions",
    });
  }
};

// =====================================================
// GET SINGLE QUESTION
// =====================================================

const getQuestionById = async (req, res) => {
  try {
    const { id } = req.params;

    const question = await Question.findById(id).select(
      "-correctAnswer"
    );

    if (!question) {
      return res.status(404).json({
        success: false,
        message: "Question not found",
      });
    }

    res.status(200).json({
      success: true,
      question,
    });
  } catch (error) {
    console.error("Get Question Error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch question",
    });
  }
};

// =====================================================
// UPDATE QUESTION
// =====================================================

const updateQuestion = async (req, res) => {
  try {
    const { id } = req.params;

    const question = await Question.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!question) {
      return res.status(404).json({
        success: false,
        message: "Question not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Question updated successfully",
      question,
    });
  } catch (error) {
    console.error("Update Question Error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to update question",
    });
  }
};

// =====================================================
// DELETE QUESTION
// =====================================================

const deleteQuestion = async (req, res) => {
  try {
    const { id } = req.params;

    const question = await Question.findByIdAndDelete(id);

    if (!question) {
      return res.status(404).json({
        success: false,
        message: "Question not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Question deleted successfully",
    });
  } catch (error) {
    console.error("Delete Question Error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to delete question",
    });
  }
};

module.exports = {
  createQuestion,
  getQuestionsByExam,
  getQuestionById,
  updateQuestion,
  deleteQuestion,
};