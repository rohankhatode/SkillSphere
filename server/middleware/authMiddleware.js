const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    try {

        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: "Access Denied. No token provided."
            });
        }

        if (!authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Invalid Authorization Format."
            });
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = decoded;

        next();

    } catch (err) {

        console.error(err);

        if (err.name === "TokenExpiredError") {
            return res.status(401).json({
                success: false,
                message: "Token Expired"
            });
        }

        return res.status(401).json({
            success: false,
            message: "Invalid Token"
        });

    }
};

module.exports = authMiddleware;