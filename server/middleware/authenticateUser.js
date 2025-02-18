const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // Bearer token
  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Invalid token" });
    }

    req.user = decoded; // Set user info (including _id) to req.user
    next();
  });
};

module.exports = authenticateUser;
