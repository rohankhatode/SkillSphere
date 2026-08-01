const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/User");

// Signup Controller
const signup = async (req, res) => {
    try {

        const { fullName, email, phoneNumber, password } = req.body;

        const normalizedEmail = email.trim().toLowerCase();

        const existingUser = await User.findOne({
            email: normalizedEmail,
        });

        if (existingUser) {
            return res.status(400).json({
                message: "Email already exists",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            fullName,
            email: normalizedEmail,
            phoneNumber,
            password: hashedPassword,
        });

        await user.save();

        res.status(201).json({
            message: "Signup Successful",
            user,
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: err.message,
        });

    }
};

// Login Controller
const login = async (req, res) => {

    try {

        const { email, password } = req.body;

        const normalizedEmail = email.trim().toLowerCase();

        const user = await User.findOne({
            email: normalizedEmail,
        });

        if (!user) {
            return res.status(400).json({
                message: "Invalid Email or Password",
            });
        }
        if (user.provider === "google") {
            return res.status(400).json({
                message: "This account uses Google Sign-In. Please continue with Google."
            });
        }

        const match = await bcrypt.compare(
            password,
            user.password
        );

        if (!match) {
            return res.status(400).json({
                message: "Invalid Email or Password",
            });
        }

        const token = jwt.sign(
            {
                id: user._id,
                email: user.email,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d",
            }
        );

        res.status(200).json({
            message: "Login Successful",
            token,
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                provider: user.provider
            },
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: "Server Error",
        });

    }
};

// Google Login Controller
const googleAuth = async (req, res) => {
    try {

        const { fullName, email } = req.body;

        const normalizedEmail = email.trim().toLowerCase();

        let user = await User.findOne({
            email: normalizedEmail,
        });

        // If user doesn't exist, create one
        if (!user) {

            const hashedPassword = await bcrypt.hash("GOOGLE_ACCOUNT", 10);
            user = new User({
                fullName,
                email: normalizedEmail,
                phoneNumber: "",
                password: hashedPassword,
                provider: "google",
                phoneVerified: false
            });

            await user.save();

            const token = jwt.sign(
                {
                    id: user._id,
                    email: user.email,
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: "1d",
                }
            );

            return res.status(200).json({

                message: "Google Signup Successful",

                isNewUser: true,

                token,

                user: {
                    id: user._id,
                    fullName: user.fullName,
                    email: user.email,
                    provider: user.provider,
                }
            });

        }

        // Existing user
        const token = jwt.sign(
            {
                id: user._id,
                email: user.email,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d",
            }
        );

        return res.status(200).json({

            message: "Google Login Successful",

            isNewUser: false,

            token,

            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                provider: user.provider,
            }
        });

    }
    catch (err) {

        console.log(err);

        res.status(500).json({
            message: "Google Login Failed",
        });

    }
};

module.exports = {
    signup,
    login,
    googleAuth,
};