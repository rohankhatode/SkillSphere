const User = require("../model/User");
const jwt = require("jsonwebtoken");

const googleAuth = async (req, res) => {

    try {

        const { fullName, email, picture } = req.body;

        let user = await User.findOne({
            email: email.toLowerCase()
        });

        let isNewUser = false;

        if (!user) {

            isNewUser = true;

            user = new User({
                fullName,
                email: email.toLowerCase(),

                // Temporary values until onboarding
                phoneNumber: "",
                password: "",

                provider: "google",
                profilePicture: picture
            });

            await user.save();
        }

        const token = jwt.sign(
            {
                id: user._id,
                email: user.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        res.json({

            message: "Google Login Successful",

            token,

            isNewUser,

            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email
            }

        });

    }
    catch (err) {

        console.log(err);

        res.status(500).json({
            message: "Google Login Failed"
        });

    }

};

module.exports = { googleAuth };