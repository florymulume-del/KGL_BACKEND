/**
 * Authentication Middleware
 * -------------------------
 * Verifies the JSON Web Token (JWT) sent in the Authorization header.
 * 
 * Usage:
 * - Attach this middleware to routes that require authentication.
 * - It expects the header format: Authorization: Bearer <token>
 * - After verification, sets req.user = { id, role } from the token payload
 */

const jwt = require("jsonwebtoken");

// Ideally, store the JWT secret in an environment variable for security
const JWT_SECRET = process.env.JWT_SECRET || "secret123";

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check if Authorization header exists and starts with 'Bearer '
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Unauthorized: No token provided"
    });
  }

  // Extract token from header
  const token = authHeader.split(" ")[1];

  try {
    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Attach user info to request object for downstream middleware/controllers
    req.user = decoded; // decoded contains id and role

    next();
  } catch (err) {
    return res.status(401).json({
      message: "Invalid or expired token"
    });
  }
};