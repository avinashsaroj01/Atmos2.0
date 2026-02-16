require("dotenv").config();
const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    const header = req.header("Authorization");

    // No header
    if (!header) {
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }

    // Extract token
    const token = header.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Invalid token format",
      });
    }

    const verified = jwt.verify(token, process.env.TOKEN_SECRET);

    req.user = verified;

    next();
  } catch (err) {
    console.log("JWT ERROR:", err.message);
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }
};

module.exports = auth;
