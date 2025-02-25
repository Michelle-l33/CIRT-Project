const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
    const authHeader = req.header("Authorization"); // ✅ Read from headers

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "No token provided" });
    }

    const token = authHeader.split(" ")[1]; // Extract token

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user info
        next(); // Continue to next middleware
    } catch (error) {
        res.status(403).json({ error: "Invalid token" });
    }
};

module.exports = authenticateUser;
