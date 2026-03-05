const express = require("express");
const router = express.Router();
const User = require("../modules/users");
const JWT_SECRET = "secret123"; 
const auth = require("../middleware/auth");
const { managerOnly } = require("../middleware/roles");
const {getAllUsers,getUsersById,createUsers,updateUsers,deleteUsers} = require("../controllers/users.js"); 
const{loginUsers} = require("../controllers/login.js"); 

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
router.post("/", auth, managerOnly,createUsers)

/* ================================
   UPDATE USER
   PATCH /users/:id
================================ */
router.patch("/:id", auth, managerOnly,updateUsers);

/* ================================
   DELETE USER
   DELETE /users/:id
================================ */
router.delete("/:id", auth, managerOnly,deleteUsers);
/* ================================
   LOGIN ROUTE
   POST /users/login
================================ */
router.post("/login",loginUsers );

// Change password
router.post("/change-password", auth, async (req, res) => {
  try {
    const { newPassword } = req.body;

    if (!newPassword || newPassword.length < 6) {
      return res.status(400).json({ error: "Password must be at least 6 characters" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await User.findByIdAndUpdate(req.user.id, {
      password: hashedPassword,
      mustChangePassword: false
    })

    res.json({ message: "Password changed successfully" });

  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});



module.exports = router;