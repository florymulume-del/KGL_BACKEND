/**
 * Users Routes
 * ------------
 * Defines all API routes related to user management and authentication.
 * 
 * Features:
 * - User CRUD operations
 * - User login
 * - Password change
 * - Role-based access control
 * 
 * Middleware used:
 * - auth → verifies JWT token
 * - directorOnly → restricts access to director role
 */

const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../modules/users");

// Secret used for JWT (should ideally come from environment variables)
const JWT_SECRET = "secret123";

// Authentication middleware
const auth = require("../middleware/auth");

// Role-based middleware
const { directorOnly } = require("../middleware/roles");

// Controllers
const {
  getAllUsers,
  getUsersById,
  createUsers,
  updateUsers,
  deleteUsers,
} = require("../controllers/users.js");

const { loginUsers } = require("../controllers/login.js");


/* =====================================
   GET ALL USERS
   -------------------------------------
   Route: GET /users
   Access: Authenticated users only
   Middleware: auth
===================================== */
router.get("/", auth, getAllUsers);



/* =====================================
   GET SINGLE USER
   -------------------------------------
   Route: GET /users/:id
   Access: Authenticated users
   Middleware: auth
===================================== */
router.get("/:id", auth, getUsersById);



/* =====================================
   CREATE USER
   -------------------------------------
   Route: POST /users
   Access: Director only
   Middleware:
   - auth
   - directorOnly
===================================== */
router.post("/", auth, directorOnly, createUsers);



/* =====================================
   UPDATE USER
   -------------------------------------
   Route: PATCH /users/:id
   Access: Director only
   Middleware:
   - auth
   - directorOnly
===================================== */
router.patch("/:id", auth, directorOnly, updateUsers);



/* =====================================
   DELETE USER
   -------------------------------------
   Route: DELETE /users/:id
   Access: Director only
   Middleware:
   - auth
   - directorOnly
===================================== */
router.delete("/:id", auth, directorOnly, deleteUsers);



/* =====================================
   USER LOGIN
   -------------------------------------
   Route: POST /users/login
   Access: Public
   Description:
   Authenticates a user and returns a JWT token.
===================================== */
router.post("/login", loginUsers);



/* =====================================
   CHANGE PASSWORD
   -------------------------------------
   Route: POST /users/change-password
   Access: Authenticated users
   Middleware: auth

   Process:
   1. User provides new password
   2. Password is validated
   3. Password is hashed using bcrypt
   4. Database password is updated
   5. mustChangePassword flag is disabled
===================================== */
router.post("/change-password", auth, async (req, res) => {
  try {

    const { newPassword } = req.body;

    // Validate password length
    if (!newPassword || newPassword.length < 6) {
      return res.status(400).json({
        error: "Password must be at least 6 characters"
      });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user password
    await User.findByIdAndUpdate(req.user.id, {
      password: hashedPassword,
      mustChangePassword: false
    });

    res.json({
      message: "Password changed successfully"
    });

  } catch (error) {

    res.status(500).json({
      error: "Server error"
    });

  }
});


/**
 * Export router
 */
module.exports = router;