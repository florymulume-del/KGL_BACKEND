const express = require("express");
const router = express.Router();
const User = require("../modules/users");

const auth = require("../middlewares/auth");
const { managerOnly } = require("../middlewares/roles");




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
router.get("/", auth, async (req, res) => {

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
        const { fullName, email, role, status, department } = req.body;

        // Basic validation
        if (!fullName || !email || !role) {
            return res.status(400).json({
                error: "Full name, email and role are required"
            });
        }

        // Default password (for now)
        const newUser = new User({
            fullName,
            email,
            role,
            status,
            department,
            password: "123456" // ⚠ Change later to hashed password
        });

        await newUser.save();
        res.status(201).json(newUser);

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

        if (!username || !password) {
            return res.status(400).json({
                error: "Username and password are required"
            });
        }

        // Only check email
        const user = await User.findOne({ email: username });

        if (!user) {
            return res.status(401).json({
                error: "User does not exist"
            });
        }

        if (user.password !== password) {
            return res.status(401).json({
                error: "Incorrect password"
            });
        }

        return res.status(200).json({
            message: "Login successful",
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});





module.exports = router;