const generateToken = require("../utils/generateToken");

const bcrypt = require("bcrypt");
const User = require("../model/User");

// Check if user already exists
const checkUser = async (req, res) => {
  try {
    const { email, phoneNumber } = req.body;
    const normalizedEmail = email?.trim().toLowerCase();

    const user = await User.findOne({
      $or: [
        ...(normalizedEmail ? [{ email: normalizedEmail }] : []),
        ...(phoneNumber ? [{ phoneNumber }] : []),
      ],
    });

    if (user) {
      return res.json({
        exists: true,
        message: "Account already exists."
      });
    }

    res.json({
      exists: false
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// =======================
// Signup Controller
// =======================
const signup = async (req, res) => {

  try {

    const {
      fullName,
      email,
      phoneNumber,
      password
    } = req.body;

    const normalizedEmail = email.trim().toLowerCase();
    const existingEmail = await User.findOne({ email });

        if (existingEmail) {
            return res.status(400).json({
                success: false,
                message: "Email already exists.",
            });
        }

        const existingPhone = await User.findOne({ phoneNumber });

        if (existingPhone) {
            return res.status(400).json({
                success: false,
                message: "Phone number already exists.",
            });
        }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const user = new User({

      fullName,
      email: normalizedEmail,
      phoneNumber,
      password: hashedPassword,
      phoneVerified: true,

    });

    await user.save();

    const token = generateToken(user);

        res.status(201).json({
            success: true,
            message: "Account created successfully.",
            token,
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                phoneNumber: user.phoneNumber,
            },
        });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

// =======================
// Login Controller
// =======================
const login = async (req, res) => {
    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required.",
            });
        }

        const normalizedEmail = email.trim().toLowerCase();

        const user = await User.findOne({
            email: normalizedEmail,
        })
        console.log("User Found:", user);
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid Email or Password",
            });
        }

        if (user.provider === "google") {
            return res.status(400).json({
                success: false,
                message:
                    "This account uses Google Sign-In. Please continue with Google.",
            });
        }

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid Email or Password",
            });
        }

        const token = generateToken(user);

        res.status(200).json({
            success: true,
            message: "Login Successful",
            token,
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                provider: user.provider,
            },
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });

    }
};

module.exports = {
    signup,
    login,
    checkUser
};