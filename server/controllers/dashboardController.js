const User = require("../model/User");
const Child = require("../model/Child");
const Exam = require("../model/Exam");
const PsychometricResult =
    require("../model/PsychometricResult");

const ExamResult =
    require("../model/ExamResult");

const Certificate =
    require("../model/Certificate");

const CourseEnrollment =
    require("../model/CourseEnrollment");


const getDashboardOverview = async (req, res) => {

    try {

        const userId = req.user.id;

        const { childId } = req.params;


        // ==========================================
        // FIND PARENT
        // ==========================================

        const user = await User.findById(userId)
            .select("-password");


        if (!user) {

            return res.status(404).json({

                success: false,

                message: "User not found"

            });

        }


        // ==========================================
        // FIND CHILD
        // ==========================================

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


        // ==========================================
        // PSYCHOMETRIC RESULT
        // ==========================================

        const psychometricResult =
            await PsychometricResult.findOne({

                child: childId

            });


        // ==========================================
        // UPCOMING EXAMS
        // ==========================================

        const today = new Date();


        const upcomingExams =
            await Exam.find({

                date: {
                    $gte: today
                },

                status: "upcoming",

                $or: [

                    {
                        assignedChildren: childId
                    },

                    {
                        grade: child.grade
                    }

                ]

            })

            

            .sort({
                date: 1
            })

            .limit(5);


        // ==========================================
        // COMPLETED TESTS
        // ==========================================

        const completedTests =
            await ExamResult.countDocuments({

                child: childId

            });


        // ==========================================
        // CERTIFICATES
        // ==========================================

        const certificateCount =
            await Certificate.countDocuments({

                child: childId

            });


        // ==========================================
        // COURSES
        // ==========================================

        const courseCount =
            await CourseEnrollment.countDocuments({

                child: childId,

                status: {

                    $in: [

                        "enrolled",

                        "in-progress",

                        "completed"

                    ]

                }

            });


        // ==========================================
        // RESPONSE
        // ==========================================

        res.status(200).json({

            success: true,

            data: {


                // ====================================
                // CHILD
                // ====================================

                child: {

                    id: child._id,

                    name: child.childName,

                    gender: child.gender,

                    dob: child.dob,

                    age: calculateAge(child.dob),

                    schoolName: child.schoolName,

                    grade: child.grade,

                    language: child.language,

                    city: child.city,

                    state: child.state,

                    address: child.address,

                    interests: child.interests,

                    goals: child.goals

                },


                // ====================================
                // STAT CARDS
                // ====================================

                stats: {

                    psychometricScore:
                        psychometricResult
                            ? psychometricResult.overallScore
                            : 0,

                    certificates:
                        certificateCount,

                    completedTests:
                        completedTests,

                    upcomingExams:
                        upcomingExams.length,

                    courses:
                        courseCount

                },


                // ====================================
                // UPCOMING EXAMS
                // ====================================

                upcomingExams: upcomingExams.map((exam) => ({
                    
                    id: exam._id,
                    title: exam.title,
                    description: exam.description,
                    subject: exam.subject,
                    grade: exam.grade,
                    date: exam.date,
                    startTime: exam.startTime,
                    duration: exam.duration,
                    totalQuestions: exam.totalQuestions,
                    totalMarks: exam.totalMarks,
                    passingMarks: exam.passingMarks,
                    instructions: exam.instructions,
                    rules: exam.rules,
                    status: exam.status
                })),


                // ====================================
                // PSYCHOMETRIC SUMMARY
                // ====================================

                psychometricSummary:

                    psychometricResult

                        ? {

                            overallScore:
                                psychometricResult
                                    .overallScore,

                            creativity:
                                psychometricResult
                                    .creativity,

                            problemSolving:
                                psychometricResult
                                    .problemSolving,

                            communication:
                                psychometricResult
                                    .communication,

                            leadership:
                                psychometricResult
                                    .leadership,

                            innovation:
                                psychometricResult
                                    .innovation,

                            logicalThinking:
                                psychometricResult
                                    .logicalThinking,

                            focus:
                                psychometricResult
                                    .focus,

                            collaboration:
                                psychometricResult
                                    .collaboration,

                            personality:
                                psychometricResult
                                    .personality,

                            personalityDescription:
                                psychometricResult
                                    .personalityDescription,

                            learningStyle:
                                psychometricResult
                                    .learningStyle,

                            learningStyleDescription:
                                psychometricResult
                                    .learningStyleDescription,

                            strongestSkill:
                                psychometricResult
                                    .strongestSkill,

                            strongestSkillScore:
                                psychometricResult
                                    .strongestSkillScore,

                            careerInterest:
                                psychometricResult
                                    .careerInterest,

                            careerInterestDescription:
                                psychometricResult
                                    .careerInterestDescription,

                            aiInsight:
                                psychometricResult
                                    .aiInsight

                        }

                        : null

            }

        });


    } catch (error) {

    console.error("=================================");
    console.error("DASHBOARD OVERVIEW ERROR");
    console.error(error);
    console.error("=================================");

    res.status(500).json({

        success: false,

        message: error.message

    });

}
};


/*
=====================================================
GET ACCOUNT DETAILS
GET /api/dashboard/account/:childId
=====================================================
*/

const getAccountDetails = async (req, res) => {

    try {

        const userId = req.user.id;

        const { childId } = req.params;


        /*
        ============================================
        FIND CHILD
        ============================================
        */

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


        /*
        ============================================
        FIND PARENT
        ============================================
        */

        const user = await User.findById(userId)

            .select("-password");


        if (!user) {

            return res.status(404).json({

                success: false,

                message: "Parent not found"

            });

        }


        /*
        ============================================
        RESPONSE
        ============================================
        */

        res.status(200).json({

            success: true,

            data: {

                /*
                CHILD INFORMATION
                */

                personalInformation: {

                    fullName: child.childName,

                    gender: child.gender,

                    dob: child.dob,

                    age: calculateAge(child.dob),

                    language: child.language

                },


                /*
                PARENT INFORMATION
                */

                parentInformation: {

                    father: user.fullName,

                    mother: user.motherName,

                    phone: user.phoneNumber,

                    email: user.email,

                    emergencyContact: user.emergencyContact

                },


                /*
                SCHOOL INFORMATION
                */

                schoolDetails: {

                    school: child.schoolName,

                    grade: child.grade

                },


                /*
                LOCATION
                */

                location: {

                    city: child.city,

                    state: child.state,

                    nationality: "",

                    address: child.address

                },


                /*
                INTERESTS
                */

                interests: child.interests,


                /*
                GOALS
                */

                goals: child.goals

            }

        });

    } catch (error) {

        console.error(
            "Account Details Error:",
            error
        );

        res.status(500).json({

            success: false,

            message: "Unable to load account details"

        });

    }
};

    /*
=====================================================
UPDATE ACCOUNT DETAILS
PUT /api/dashboard/account/:childId
=====================================================
*/

const updateAccountDetails = async (req, res) => {

    try {

        const userId = req.user.id;

        const { childId } = req.params;


        /*
        ============================================
        FIND CHILD
        ============================================
        */

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


        /*
        ============================================
        FIND PARENT
        ============================================
        */

        const user = await User.findById(userId);


        if (!user) {

            return res.status(404).json({

                success: false,

                message: "Parent not found"

            });

        }


        /*
        ============================================
        CHILD INFORMATION
        ============================================
        */

        const {

            fullName,
            gender,
            dob,
            language,
            school,
            grade,
            city,
            state,
            address,
            interests,
            goals,

            father,
            mother,
            phone,
            email,
            emergencyContact

        } = req.body;


        /*
        ============================================
        UPDATE CHILD
        ============================================
        */

        if (fullName !== undefined)
            child.childName = fullName;

        if (gender !== undefined)
            child.gender = gender;

        if (dob !== undefined)
            child.dob = dob;

        if (language !== undefined)
            child.language = language;

        if (school !== undefined)
            child.schoolName = school;

        if (grade !== undefined)
            child.grade = grade;

        if (city !== undefined)
            child.city = city;

        if (state !== undefined)
            child.state = state;

        if (address !== undefined)
            child.address = address;

        if (interests !== undefined) {

            if (!Array.isArray(interests)) {

                return res.status(400).json({

                    success: false,

                    message: "Interests must be an array"

                });

            }

            child.interests = interests;

        }


        if (goals !== undefined) {

            if (!Array.isArray(goals)) {

                return res.status(400).json({

                    success: false,

                    message: "Goals must be an array"

                });

            }

            child.goals = goals;

        }


        /*
        ============================================
        UPDATE PARENT
        ============================================
        */

        if (father !== undefined)
            user.fullName = father;

        if (mother !== undefined)
            user.motherName = mother;

        if (phone !== undefined)
            user.phoneNumber = phone;

        if (email !== undefined)
            user.email = email.toLowerCase();

        if (emergencyContact !== undefined)
            user.emergencyContact = emergencyContact;


        /*
        ============================================
        SAVE BOTH
        ============================================
        */

        await child.save();

        await user.save();


        /*
        ============================================
        RETURN UPDATED DATA
        ============================================
        */

        res.status(200).json({

            success: true,

            message: "Account details updated successfully",

            data: {

                personalInformation: {

                    fullName: child.childName,

                    gender: child.gender,

                    dob: child.dob,

                    age: calculateAge(child.dob),

                    language: child.language

                },

                parentInformation: {

                    father: user.fullName,

                    mother: user.motherName,

                    phone: user.phoneNumber,

                    email: user.email,

                    emergencyContact:
                        user.emergencyContact

                },

                schoolDetails: {

                    school: child.schoolName,

                    grade: child.grade

                },

                location: {

                    city: child.city,

                    state: child.state,

                    nationality: "",

                    address: child.address

                },

                interests: child.interests,

                goals: child.goals

            }

        });


    } catch (error) {

        console.error(
            "================================="
        );

        console.error(
            "UPDATE ACCOUNT DETAILS ERROR"
        );

        console.error(error);

        console.error(
            "================================="
        );


        res.status(500).json({

            success: false,

            message:
                "Unable to update account details"

        });

    }

};


/*
=====================================================
CALCULATE AGE
=====================================================
*/

const calculateAge = (dob) => {

    if (!dob) {

        return null;

    }

    const birthDate = new Date(dob);

    const today = new Date();


    let age =
        today.getFullYear() -
        birthDate.getFullYear();


    const monthDifference =
        today.getMonth() -
        birthDate.getMonth();


    if (

        monthDifference < 0 ||

        (
            monthDifference === 0 &&
            today.getDate() < birthDate.getDate()
        )

    ) {

        age--;

    }


    return age;

};


module.exports = {

    getDashboardOverview,

    getAccountDetails,

    updateAccountDetails

};