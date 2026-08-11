const User = require("../model/User");
const Child = require("../model/Child");

/*
    GET DASHBOARD OVERVIEW

    Returns basic information required by the dashboard.
*/
const getDashboardOverview = async (req, res) => {
    try {

        const userId = req.user.id;

        // Find logged-in parent/user
        const user = await User.findById(userId)
            .select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // Find child belonging to logged-in parent
        const child = await Child.findOne({
            parent: userId
        });

        if (!child) {
            return res.status(404).json({
                success: false,
                message: "Child profile not found"
            });
        }

        res.status(200).json({
            success: true,

            data: {
                child: {
                    id: child._id,
                    name: child.childName,
                    gender: child.gender,
                    dob: child.dob,
                    schoolName: child.schoolName,
                    grade: child.grade,
                    language: child.language,
                    city: child.city,
                    state: child.state,
                    address: child.address,
                    interests: child.interests,
                    goals: child.goals
                },

                parent: {
                    id: user._id,
                    fullName: user.fullName,
                    email: user.email,
                    phoneNumber: user.phoneNumber,
                    phoneVerified: user.phoneVerified,
                    profilePicture: user.profilePicture
                }
            }
        });

    } catch (error) {

        console.error("Dashboard Overview Error:", error);

        res.status(500).json({
            success: false,
            message: "Unable to load dashboard"
        });
    }
};


/*
    GET ACCOUNT DETAILS

    Used by:
    Dashboard → Account Details
*/
const getAccountDetails = async (req, res) => {

    try {

        const userId = req.user.id;

        // Parent
        const user = await User.findById(userId)
            .select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // Child
        const child = await Child.findOne({
            parent: userId
        });

        if (!child) {
            return res.status(404).json({
                success: false,
                message: "Child profile not found"
            });
        }

        res.status(200).json({

            success: true,

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
                    mother: "",
                    phone: user.phoneNumber,
                    email: user.email,
                    emergencyContact: ""
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

        console.error("Account Details Error:", error);

        res.status(500).json({
            success: false,
            message: "Unable to load account details"
        });
    }
};


/*
    Calculate child's age
*/
const calculateAge = (dob) => {

    if (!dob) {
        return null;
    }

    const birthDate = new Date(dob);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();

    const monthDifference =
        today.getMonth() - birthDate.getMonth();

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
    getAccountDetails
};