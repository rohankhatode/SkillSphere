const { OAuth2Client } = require("google-auth-library");

const User = require("../model/User");
const generateToken = require("../utils/generateToken");

const googleClient = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID
);

const googleAuth = async (req, res) => {
    try {

        const { credential } = req.body;

        if (!credential) {
            return res.status(400).json({
                success: false,
                message: "Google credential is required."
            });
        }

        // Verify Google ID token
        const ticket = await googleClient.verifyIdToken({
            idToken: credential,
            audience: process.env.GOOGLE_CLIENT_ID
        });

        const payload = ticket.getPayload();

        const googleId = payload.sub;
        const email = payload.email;
        const fullName = payload.name || "";
        const picture = payload.picture || "";

        if (!googleId || !email) {
            return res.status(400).json({
                success: false,
                message: "Invalid Google account information."
            });
        }

        const normalizedEmail = email.trim().toLowerCase();

        // Find existing user
        let user = await User.findOne({
            email: normalizedEmail
        });

        // Existing local account
        if (user && user.provider === "local") {
            return res.status(400).json({
                success: false,
                message:
                    "This email is already registered using Email & Password."
            });
        }

        let isNewUser = false;

        // Create Google user
        if (!user) {

            isNewUser = true;

            user = await User.create({
                fullName: fullName.trim(),
                email: normalizedEmail,
                phoneNumber: "",
                password: "",
                provider: "google",
                profilePicture: picture || "",
                isVerified: true,
                
            });

        } else {

            // Update Google profile information
            user.fullName = fullName.trim() || user.fullName;
            user.profilePicture = picture || user.profilePicture;

            await user.save();
        }

        // Generate SkillSphere JWT
        const token = generateToken(user);

        return res.status(200).json({
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

    } catch (error) {

        console.error("Google Authentication Error:", error);

        return res.status(401).json({
            success: false,
            message: "Invalid Google authentication."
        });
    }
};

module.exports = {
    googleAuth
};