const express = require("express");
const router = express.Router();
const User = require("../modules/users");
const bcrypt = require("bcryptjs");
const JWT_SECRET = "secret123"; 
const auth = require("../middleware/auth");
const { adminOnly } = require("../middleware/roles");
const {getAllUsers,getUsersById,createUsers,updateUsers,deleteUsers,} = require("../controllers/users.js"); 
const{loginUsers} = require("../controllers/login.js"); 
const{changePwd} = require("../controllers/change-password.js"); 

/* ================================
   GET ALL USERS
   GET /users
================================ */

router.get("/", auth,getAllUsers);

/* ================================
   GET SINGLE USER
   GET /users/:id
================================ */
router.get("/:id", auth,getUsersById);

/* ================================
   CREATE USER
   POST /users
================================ */
router.post("/", auth, adminOnly,createUsers)

/* ================================
   UPDATE USER
   PATCH /users/:id
================================ */
router.patch("/:id", auth, adminOnly,updateUsers);

/* ================================
   DELETE USER
   DELETE /users/:id
================================ */
router.delete("/:id", auth, adminOnly,deleteUsers);
/* ================================
   LOGIN ROUTE
   POST /users/login
================================ */
router.post("/login",loginUsers );

// Change password
router.post("/change-password",auth,changePwd);

module.exports = router;