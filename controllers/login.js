/**
 * User Authentication Controller
 * ------------------------------
 * Handles user login and authentication.
 * 
 * Technologies used:
 * - bcryptjs → for password hashing comparison
 * - jsonwebtoken → for generating authentication tokens
 */

const User = require("../modules/users.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


/**
 * LOGIN USER
 * ----------
 * Authenticates a user using email (username) and password.
 * 
 * Process:
 * 1. Receive username and password from request body
 * 2. Find user by email in database
 * 3. Compare provided password with stored hashed password
 * 4. Generate JWT token if authentication succeeds
 * 5. Return token and user details
 * 
 * Route: POST /api/auth/login
 */
const loginUsers = async (req, res) => {
  try {

    // Extract login credentials from request body
    const { username, password } = req.body;


    /**
     * STEP 1: Find user by email
     * Username field is mapped to the user's email
     */
    const user = await User.findOne({ email: username });

    // If user does not exist
    if (!user) {
      return res.status(401).json({
        error: "Invalid login"
      });
    }


    /**
     * STEP 2: Compare entered password with stored hashed password
     * bcrypt.compare returns true if passwords match
     */
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        error: "Invalid login"
      });
    }


    /**
     * STEP 3: Generate JWT Token
     * Payload contains user ID and role
     * Token expires after 1 hour
     */
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role
      },
      process.env.JWT_SECRET || "secret123", // Fallback secret
      {
        expiresIn: "1h"
      }
    );


    /**
     * STEP 4: Send successful response
     * Includes token and user information
     */
    res.json({
      message: "Login successful",
      token,

      // Flag used for forcing password change on first login
      mustChangePassword: user.mustChangePassword,

      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {

    // Log server error
    console.error(error);

    // Return generic server error message
    res.status(500).json({
      error: "Server error"
    });

  }
};


/**
 * EXPORT CONTROLLER FUNCTIONS
 * ---------------------------
 * Makes loginUsers available to route files.
 */
module.exports = {
  loginUsers
};