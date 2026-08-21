const Result = require("../model/Result");
const Question = require("../model/Question");
const Exam = require("../model/Exam");
const Child = require("../model/Child");

const getAuthorizedResult = async (resultId, parentId) => {
  const result = await Result.findById(resultId);

  if (!result) {
    return null;
  }

  const child = await Child.findOne({
    _id: result.child,
    parent: parentId,
  });

  if (!child) {
    return null;
  }

  return result;
};

/*
=========================================
CREATE / START RESULT
=========================================
*/

const createResult = async (req, res) => {
  try {
    const { examId, childId } = req.body;

    if (!examId || !childId) {
      return res.status(400).json({
        success: false,
        message: "examId and childId are required",
      });
    }

    // Check if an active attempt already exists
    let result = await Result.findOne({
      exam: examId,
      child: childId,
      status: {
        $in: ["not-started", "in-progress"],
      },
    });

    if (result) {
      return res.status(200).json({
  success: true,
  message: "Existing exam attempt found",

  result: {
    resultId: result._id,
    examId: result.exam,
    childId: result.child,
    status: result.status,
    totalQuestions: result.totalQuestions,
    startedAt: result.startedAt,
  },
});
    }

    // Count questions
    const totalQuestions = await Question.countDocuments({
      exam: examId,
    });

    result = await Result.create({
      exam: examId,
      child: childId,
      totalQuestions,
      attemptedQuestions: 0,
      score: 0,
      percentage: 0,
      status: "in-progress",
      startedAt: new Date(),
      answers: [],
    });

    return res.status(201).json({
  success: true,
  message: "Exam attempt created successfully",

  result: {
    resultId: result._id,
    examId: result.exam,
    childId: result.child,
    status: result.status,
    totalQuestions: result.totalQuestions,
    startedAt: result.startedAt,
  },
});
  } catch (error) {
    console.error("Create Result Error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to create exam attempt",
    });
  }
};


/*
=========================================
SAVE ANSWER
=========================================
*/

const saveAnswer = async (req, res) => {
  try {
    const { resultId } = req.params;

    const {
      questionId,
      selectedAnswer,
    } = req.body;

    if (!resultId || !questionId) {
      return res.status(400).json({
        success: false,
        message: "resultId and questionId are required",
      });
    }

    if (
      selectedAnswer === undefined ||
      selectedAnswer === null
    ) {
      return res.status(400).json({
        success: false,
        message: "selectedAnswer is required",
      });
    }

    /*
    -----------------------------------------
    Find result
    -----------------------------------------
    */

    const result = await getAuthorizedResult(
      resultId,
      req.user.id
    );

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Exam attempt not found",
      });
    }

    /*
    -----------------------------------------
    Don't allow answers after submission
    -----------------------------------------
    */

    if (result.status === "completed") {
      return res.status(400).json({
        success: false,
        message: "Exam has already been submitted",
      });
    }

    /*
    -----------------------------------------
    Find question
    -----------------------------------------
    */

    const question = await Question.findById(questionId);

    if (!question) {
      return res.status(404).json({
        success: false,
        message: "Question not found",
      });
    }

    /*
    -----------------------------------------
    Make sure question belongs to exam
    -----------------------------------------
    */

    if (
      question.exam.toString() !==
      result.exam.toString()
    ) {
      return res.status(400).json({
        success: false,
        message: "Question does not belong to this exam",
      });
    }

    /*
    -----------------------------------------
    Check answer
    -----------------------------------------
    */

    const isCorrect =
      Number(selectedAnswer) ===
      Number(question.correctAnswer);

    const marksObtained = isCorrect
      ? question.marks
      : 0;

    /*
    -----------------------------------------
    Check whether answer already exists
    -----------------------------------------
    */

    const existingAnswerIndex =
      result.answers.findIndex(
        (answer) =>
          answer.question.toString() ===
          questionId.toString()
      );

    /*
    -----------------------------------------
    Update existing answer
    -----------------------------------------
    */

    if (existingAnswerIndex !== -1) {
      result.answers[existingAnswerIndex].selectedAnswer =
        Number(selectedAnswer);

      result.answers[existingAnswerIndex].isCorrect =
        isCorrect;

      result.answers[existingAnswerIndex].marksObtained =
        marksObtained;
    }

    /*
    -----------------------------------------
    Add new answer
    -----------------------------------------
    */

    else {
      result.answers.push({
        question: questionId,
        selectedAnswer: Number(selectedAnswer),
        isCorrect,
        marksObtained,
      });
    }

    /*
    -----------------------------------------
    Recalculate progress
    -----------------------------------------
    */

    result.attemptedQuestions =
      result.answers.length;

    /*
    -----------------------------------------
    Recalculate score
    -----------------------------------------
    */

    result.score = result.answers.reduce(
      (total, answer) =>
        total + answer.marksObtained,
      0
    );

    const examTotalMarks = await Question.aggregate([
      {
        $match: {
          exam: result.exam,
        },
      },
      {
        $group: {
          _id: null,
          totalMarks: {
            $sum: "$marks",
          },
        },
      },
    ]);

    const totalMarks =
      examTotalMarks[0]?.totalMarks || 0;

    result.percentage =
      totalMarks > 0
        ? Math.round(
            (result.score / totalMarks) * 100
          )
        : 0;

    await result.save();

    return res.status(200).json({
      success: true,
      message: "Answer saved successfully",
      answer: {
        questionId,
        selectedAnswer: Number(selectedAnswer),
        isCorrect,
        marksObtained,
      },
      result: {
        attemptedQuestions:
          result.attemptedQuestions,

        score: result.score,
      },
    });
  } catch (error) {
    console.error("Save Answer Error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to save answer",
    });
  }
};

const clearAnswer = async (req, res) => {
  try {
    const { resultId, questionId } = req.params;

    if (!resultId || !questionId) {
      return res.status(400).json({
        success: false,
        message: "resultId and questionId are required",
      });
    }

    const result = await getAuthorizedResult(
      resultId,
      req.user.id
    );

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Exam attempt not found",
      });
    }

    if (result.status === "completed") {
      return res.status(400).json({
        success: false,
        message: "Exam has already been submitted",
      });
    }

    result.answers = result.answers.filter(
      (answer) =>
        answer.question.toString() !==
        questionId.toString()
    );

    result.attemptedQuestions =
      result.answers.length;

    result.score = result.answers.reduce(
      (total, answer) =>
        total + (answer.marksObtained || 0),
      0
    );

    const totalMarksData =
      await Question.aggregate([
        {
          $match: {
            exam: result.exam,
          },
        },
        {
          $group: {
            _id: null,
            totalMarks: {
              $sum: "$marks",
            },
          },
        },
      ]);

    const totalMarks =
      totalMarksData[0]?.totalMarks || 0;

    result.percentage =
      totalMarks > 0
        ? Math.round(
            (result.score / totalMarks) * 100
          )
        : 0;

    await result.save();

    return res.status(200).json({
      success: true,
      message: "Answer cleared successfully",

      result: {
        attemptedQuestions:
          result.attemptedQuestions,

        score:
          result.score,

        percentage:
          result.percentage,
      },
    });

  } catch (error) {
    console.error(
      "Clear Answer Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Unable to clear answer",
    });
  }
};

/*
=========================================
GET RESULT / ATTEMPT
=========================================
*/

const getResult = async (req, res) => {
  try {
    const { resultId } = req.params;
    const parentId = req.user.id;

    const result = await getAuthorizedResult(
      resultId,
      req.user.id
    );

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Exam attempt not found",
      });
    }

    await result.populate("exam");
    await result.populate("child");
    await result.populate("answers.question");

    return res.status(200).json({
      success: true,
      result,
    });
  } catch (error) {
    console.error("Get Result Error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch result",
    });
  }
};

//RESULT BY CHILDID

const getResultsByChild = async (req, res) => {
  try {
    const { childId } = req.params;

    // Logged-in parent
    const parentId = req.user.id;

    // Find child belonging to this parent
    const child = await Child.findOne({
      _id: childId,
      parent: parentId,
    });

    if (!child) {
      return res.status(404).json({
        success: false,
        message: "Child not found",
      });
    }

    // Get results for this child
    const results = await Result.find({
      child: childId,
    })
      .populate(
        "exam",
        "title subject grade date startTime"
      )
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: results.length,
      results,
    });

  } catch (error) {
    console.error(
      "Get Child Results Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Unable to fetch child results",
    });
  }
};

/*
=====================================================
SUBMIT EXAM / COMPLETE RESULT
=====================================================
*/

const submitResult = async (req, res) => {
  try {
    const { resultId } = req.params;

    if (!resultId) {
      return res.status(400).json({
        success: false,
        message: "resultId is required",
      });
    }

    /*
    -----------------------------------------
    Find result
    -----------------------------------------
    */

    const result = await getAuthorizedResult(
      resultId,
      req.user.id
    );

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Exam attempt not found",
      });
    }

    /*
    -----------------------------------------
    Prevent duplicate submission
    -----------------------------------------
    */

    if (result.status === "completed") {
      return res.status(400).json({
        success: false,
        message: "Exam has already been submitted",
      });
    }

    /*
    -----------------------------------------
    Calculate attempted questions
    -----------------------------------------
    */

    result.attemptedQuestions =
      result.answers.length;

    /*
    -----------------------------------------
    Calculate score
    -----------------------------------------
    */

    result.score = result.answers.reduce(
      (total, answer) =>
        total + (answer.marksObtained || 0),
      0
    );

    /*
    -----------------------------------------
    Calculate total questions
    -----------------------------------------
    */

    const totalQuestions = await Question.countDocuments({
      exam: result.exam,
    });

    result.totalQuestions = totalQuestions;

    /*
    -----------------------------------------
    Calculate total marks
    -----------------------------------------
    */

    const totalMarksData =
      await Question.aggregate([
        {
          $match: {
            exam: result.exam,
          },
        },
        {
          $group: {
            _id: null,
            totalMarks: {
              $sum: "$marks",
            },
          },
        },
      ]);

    const totalMarks =
      totalMarksData[0]?.totalMarks || 0;

    /*
    -----------------------------------------
    Calculate percentage
    -----------------------------------------
    */

    result.percentage =
      totalMarks > 0
        ? Math.round(
            (result.score / totalMarks) * 100
          )
        : 0;

    /*
    -----------------------------------------
    Mark completed
    -----------------------------------------
    */

    result.status = "completed";

    result.submittedAt = new Date();

    await result.save();

    /*
    -----------------------------------------
    Return final result
    -----------------------------------------
    */

    return res.status(200).json({
      success: true,
      message: "Exam submitted successfully",

      result: {
        resultId: result._id,
        examId: result.exam,
        childId: result.child,

        totalQuestions:
          result.totalQuestions,

        attemptedQuestions:
          result.attemptedQuestions,

        score:
          result.score,

        percentage:
          result.percentage,

        status:
          result.status,

        startedAt:
          result.startedAt,

        submittedAt:
          result.submittedAt,
      },
    });

  } catch (error) {
    console.error(
      "Submit Result Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Unable to submit exam",
    });
  }
};

module.exports = {
  createResult,
  saveAnswer,
  clearAnswer,
  getResult,
  getResultsByChild,
  submitResult,
};