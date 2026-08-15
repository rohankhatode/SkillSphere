const Exam = require("../model/Exam");
const Child = require("../model/Child");
const ExamResult = require("../model/ExamResult");


// =====================================================
// CREATE EXAM
// =====================================================

const createExam = async (req, res) => {
  try {
    const {
      title,
      description,
      subject,
      grade,
      date,
      startTime,
      duration,
      totalQuestions,
      totalMarks,
      passingMarks,
      instructions,
      rules,
      assignedChildren,
      course,
    } = req.body;

    if (
      !title ||
      !subject ||
      !grade ||
      !date ||
      !startTime ||
      !duration
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required exam details",
      });
    }

    const exam = await Exam.create({
      title,
      description,
      subject,
      grade,
      date,
      startTime,
      duration,
      totalQuestions,
      totalMarks,
      passingMarks,
      instructions,
      rules,
      assignedChildren,
      course,
    });

    res.status(201).json({
      success: true,
      message: "Exam created successfully",
      exam,
    });

  } catch (error) {
    console.error("=================================");
    console.error("CREATE EXAM ERROR:");
    console.error(error);
    console.error("MESSAGE:", error.message);
    console.error("=================================");

    res.status(500).json({
        success: false,
        message: error.message
    });
}
};


// =====================================================
// GET ALL EXAMS
// =====================================================

const getAllExams = async (req, res) => {
  try {
    const exams = await Exam.find()
      .populate("assignedChildren", "childName grade")
      .sort({ date: 1 });

    res.status(200).json({
      success: true,
      count: exams.length,
      exams,
    });

  } catch (error) {
    console.error("Get Exams Error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch exams",
    });
  }
};


// =====================================================
// GET SINGLE EXAM
// =====================================================

const getExamById = async (req, res) => {
  try {
    const { id } = req.params;

    const exam = await Exam.findById(id)
      .populate("assignedChildren", "childName grade");

    if (!exam) {
      return res.status(404).json({
        success: false,
        message: "Exam not found",
      });
    }

    res.status(200).json({
      success: true,
      exam,
    });

  } catch (error) {
    console.error("Get Exam Error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch exam",
    });
  }
};


// =====================================================
// GET UPCOMING EXAMS FOR LOGGED-IN CHILD
// =====================================================

const getUpcomingExams = async (req, res) => {
  try {
    const { childId } = req.params;

    // Check child
    const child = await Child.findById(childId);

    if (!child) {
      return res.status(404).json({
        success: false,
        message: "Child not found",
      });
    }

    // Security check
    if (child.parent.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to access this child's exams",
      });
    }

    const today = new Date();

    const exams = await Exam.find({
      date: {
        $gte: today,
      },

      status: "upcoming",

      $or: [
        {
          assignedChildren: childId,
        },
        {
          grade: child.grade,
        },
      ],
    }).sort({
      date: 1,
    });

    res.status(200).json({
      success: true,
      count: exams.length,
      exams,
    });

  } catch (error) {
    console.error("Upcoming Exams Error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch upcoming exams",
    });
  }
};


// =====================================================
// GET EXAM INFORMATION FOR CHILD
// =====================================================

const getExamInformation = async (req, res) => {

    try {

        const userId = req.user.id;

        const { examId, childId } = req.params;


        // =================================================
        // FIND CHILD
        // =================================================

        const child = await Child.findOne({
            _id: childId,
            parent: userId
        });


        if (!child) {

            return res.status(404).json({

                success: false,

                message: "Child not found or unauthorized"

            });

        }


        // =================================================
        // FIND EXAM
        // =================================================

        const exam = await Exam.findById(examId);


        if (!exam) {

            return res.status(404).json({

                success: false,

                message: "Exam not found"

            });

        }


        // =================================================
        // CHECK WHETHER EXAM BELONGS TO CHILD
        // =================================================

        const isAssigned =
            exam.assignedChildren.some(
                (id) => id.toString() === childId
            );


        const gradeMatches =
            exam.grade === child.grade;


        if (!isAssigned && !gradeMatches) {

            return res.status(403).json({

                success: false,

                message:
                    "This exam is not assigned to this child"

            });

        }


        // =================================================
        // CHECK EXISTING RESULT
        // =================================================

        const existingResult =
            await ExamResult.findOne({

                exam: examId,

                child: childId

            });


        // =================================================
        // RESPONSE
        // =================================================

        return res.status(200).json({

            success: true,

            data: {

                exam: {

                    id: exam._id,

                    title: exam.title,

                    description: exam.description,

                    subject: exam.subject,

                    grade: exam.grade,

                    date: exam.date,

                    startTime: exam.startTime,

                    duration: exam.duration,

                    totalQuestions:
                        exam.totalQuestions,

                    totalMarks:
                        exam.totalMarks,

                    passingMarks:
                        exam.passingMarks,

                    instructions:
                        exam.instructions,

                    rules:
                        exam.rules,

                    status:
                        exam.status

                },

                child: {

                    id: child._id,

                    name: child.childName,

                    grade: child.grade

                },

                examStatus:
                    existingResult
                        ? "already-attempted"
                        : "not-started"

            }

        });


    } catch (error) {

        console.error(
            "GET EXAM INFORMATION ERROR:",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                "Unable to load exam information"

        });

    }

};

// =====================================================
// START EXAM
// =====================================================

const startExam = async (req, res) => {

    try {

        const userId = req.user.id;

        const { examId, childId } = req.params;


        // =================================================
        // FIND CHILD
        // =================================================

        const child = await Child.findOne({

            _id: childId,

            parent: userId

        });


        if (!child) {

            return res.status(404).json({

                success: false,

                message:
                    "Child not found or unauthorized"

            });

        }


        // =================================================
        // FIND EXAM
        // =================================================

        const exam = await Exam.findById(examId);


        if (!exam) {

            return res.status(404).json({

                success: false,

                message: "Exam not found"

            });

        }


        // =================================================
        // CHECK ASSIGNMENT
        // =================================================

        const isAssigned =
            exam.assignedChildren.some(
                (id) => id.toString() === childId
            );


        const gradeMatches =
            exam.grade === child.grade;


        if (!isAssigned && !gradeMatches) {

            return res.status(403).json({

                success: false,

                message:
                    "This exam is not assigned to this child"

            });

        }


        // =================================================
        // CHECK IF ALREADY ATTEMPTED
        // =================================================

        const existingResult =
            await ExamResult.findOne({

                exam: examId,

                child: childId

            });


        if (existingResult) {

            return res.status(400).json({

                success: false,

                message:
                    "This exam has already been started or attempted"

            });

        }


        // =================================================
        // CREATE EXAM RESULT
        // =================================================

        const examResult =
            await ExamResult.create({

                exam: examId,

                child: childId,

                totalMarks:
                    exam.totalMarks,

                startedAt:
                    new Date()

            });


        // =================================================
        // RESPONSE
        // =================================================

        return res.status(201).json({

            success: true,

            message:
                "Exam started successfully",

            data: {

                examId: exam._id,

                childId: child._id,

                resultId:
                    examResult._id,

                startedAt:
                    examResult.startedAt,

                duration:
                    exam.duration,

                totalQuestions:
                    exam.totalQuestions,

                totalMarks:
                    exam.totalMarks

            }

        });


    } catch (error) {

        console.error(
            "START EXAM ERROR:",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                "Unable to start exam"

        });

    }

};

// =====================================================
// UPDATE EXAM
// =====================================================

const updateExam = async (req, res) => {
  try {
    const { id } = req.params;

    const exam = await Exam.findByIdAndUpdate(
      id,
      req.body,
      {
        returnDocument: "after",
        runValidators: true,
      }
    );

    if (!exam) {
      return res.status(404).json({
        success: false,
        message: "Exam not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Exam updated successfully",
      exam,
    });

  } catch (error) {
    console.error("Update Exam Error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to update exam",
    });
  }
};


// =====================================================
// DELETE EXAM
// =====================================================

const deleteExam = async (req, res) => {
  try {
    const { id } = req.params;

    const exam = await Exam.findByIdAndDelete(id);

    if (!exam) {
      return res.status(404).json({
        success: false,
        message: "Exam not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Exam deleted successfully",
    });

  } catch (error) {
    console.error("Delete Exam Error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to delete exam",
    });
  }
};


module.exports = {
  createExam,
  getAllExams,
  getExamById,
  getUpcomingExams,
  getExamInformation,
  startExam,
  updateExam,
  deleteExam,
};