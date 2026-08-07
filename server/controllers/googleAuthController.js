const User = require("../model/User");
const generateToken = require("../utils/generateToken");

const googleAuth = async (req, res) => {

    try {

        const { fullName, email, picture } = req.body;

        if (!fullName || !email) {
            return res.status(400).json({
                success: false,
                message: "Full name and email are required."
            });
        }

        const normalizedEmail = email.trim().toLowerCase();

        let user = await User.findOne({
            email: normalizedEmail
        });

        if (user && user.provider === "local") {
            return res.status(400).json({
                success: false,
                message: "This email is already registered using Email & Password."
            });
        }

        let isNewUser = false;

        if (!user) {

            isNewUser = true;

            user = await User.create({
                fullName: fullName.trim(),
                email: normalizedEmail,
                phoneNumber: "",
                password: "",
                provider: "google",
                profilePicture: picture || ""
            });

        }

        const token = generateToken(user);

        res.status(200).json({
            success: true,
            message: isNewUser
                ? "Google Signup Successful"
                : "Google Login Successful",
            token,
            isNewUser,
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                provider: user.provider,
                profilePicture: user.profilePicture
            }
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            success: false,
            message: "Google Authentication Failed"
        });

    }

};

module.exports = { googleAuth };