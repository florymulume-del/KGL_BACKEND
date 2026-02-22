const express = require("express");
const router = express.Router();
const User = require("../modules/users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const JWT_SECRET = "secret123"; 

const auth = require("../middleware/auth");
const { managerOnly } = require("../middleware/roles");


/* ================================
   GET ALL USERS
   GET /users
================================ */
router.get("/", auth, async (req, res) => {

    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch users" });
    }
});

/* ================================
   GET SINGLE USER
   GET /users/:id
================================ */
router.get("/:id", auth, async (req, res) => {

    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ error: "Invalid user ID" });
    }
});

/* ================================
   CREATE USER
   POST /users
================================ */
// CREATE USER

router.post("/", auth, managerOnly, async (req, res) => {
  try {
    const { fullName, email,  password, role, status, department } = req.body;

    if (!password) {
      return res.status(400).json({ error: "Password is required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullName,
      email,
      role,
      status,
      department,
      password: hashedPassword
    });

    await newUser.save();

    res.status(201).json({
      message: "User created successfully",
      user: {
        id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        role: newUser.role
      }
    });

  } catch (error) {
    res.status(500).json({ error: "Failed to create user" });
  }
});



/* ================================
   UPDATE USER
   PATCH /users/:id
================================ */
// UPDATE USER
router.patch("/:id", auth, managerOnly, async (req, res) => {

    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json(updatedUser);

    } catch (error) {
        res.status(500).json({ error: "Failed to update user" });
    }
});

/* ================================
   DELETE USER
   DELETE /users/:id
================================ */
// DELETE USER
router.delete("/:id", auth, managerOnly, async (req, res) => {

    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);

        if (!deletedUser) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json({ message: "User deleted successfully" });

    } catch (error) {
        res.status(500).json({ error: "Failed to delete user" });
    }
});
/* ================================
   LOGIN ROUTE
   POST /users/login
================================ */


router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ email: username });
    if (!user) {
      return res.status(401).json({ error: "Invalid login" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid login" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || "secret123",
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login successful",
      token,
      mustChangePassword: user.mustChangePassword, 
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});


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