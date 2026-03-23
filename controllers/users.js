/**
 * Users Controller
 * ----------------
 * Handles user management operations including:
 * - Retrieving all users
 * - Retrieving a single user
 * - Creating new users
 * - Updating users
 * - Deleting users
 * 
 * Passwords are securely hashed using bcrypt before being stored.
 */

const User = require("../modules/users.js");
const bcrypt = require("bcryptjs");


/**
 * GET ALL USERS
 * -------------
 * Retrieves all users from the database.
 * 
 * Route: GET /api/users
 */
const getAllUsers = async (req, res) => {
  try {

    const users = await User.find();

    res.json(users);

  } catch (error) {

    res.status(500).json({
      error: "Failed to fetch users"
    });

  }
};



/**
 * GET USER BY ID
 * --------------
 * Retrieves a specific user using their MongoDB ID.
 * 
 * Route: GET /api/users/:id
 */
const getUsersById = async (req, res) => {
  try {

    const user = await User.findById(req.params.id);

    // If user does not exist
    if (!user) {
      return res.status(404).json({
        error: "User not found"
      });
    }

    res.json(user);

  } catch (error) {

    res.status(500).json({
      error: "Invalid user ID"
    });

  }
};



/**
 * CREATE USER
 * -----------
 * Creates a new user account.
 * The password is hashed before saving for security.
 * 
 * Required fields:
 * - fullName
 * - email
 * - password
 * 
 * Optional fields:
 * - role
 * - status
 * - department
 * 
 * Route: POST /api/users
 */
const createUsers = async (req, res) => {
  try {

    const {
      fullName,
      email,
      password,
      role,
      status,
      department
    } = req.body;


    /**
     * STEP 1: Validate password
     */
    if (!password) {
      return res.status(400).json({
        error: "Password is required"
      });
    }


    /**
     * STEP 2: Hash password before storing
     * bcrypt.hash(password, saltRounds)
     */
    const hashedPassword = await bcrypt.hash(password, 10);


    /**
     * STEP 3: Create new user object
     */
    const newUser = new User({
      fullName,
      email,
      role,
      status,
      department,
      password: hashedPassword
    });


    /**
     * STEP 4: Save user to database
     */
    await newUser.save();


    /**
     * STEP 5: Return safe user response
     * (password is NOT returned)
     */
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

    res.status(500).json({
      error: "Failed to create user"
    });

  }
};



/**
 * UPDATE USER
 * -----------
 * Updates an existing user's information.
 * 
 * Route: PUT /api/users/:id
 */
const updateUsers = async (req, res) => {
  try {

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // Return updated document
    );

    if (!updatedUser) {
      return res.status(404).json({
        error: "User not found"
      });
    }

    res.json(updatedUser);

  } catch (error) {

    res.status(500).json({
      error: "Failed to update user"
    });

  }
};



/**
 * DELETE USER
 * -----------
 * Removes a user from the database.
 * 
 * Route: DELETE /api/users/:id
 */
const deleteUsers = async (req, res) => {
  try {

    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({
        error: "User not found"
      });
    }

    res.json({
      message: "User deleted successfully"
    });

  } catch (error) {

    res.status(500).json({
      error: "Failed to delete user"
    });

  }
};



/**
 * EXPORT CONTROLLER FUNCTIONS
 * ---------------------------
 * Makes these functions available to route files.
 */
module.exports = {
  getAllUsers,
  getUsersById,
  createUsers,
  updateUsers,
  deleteUsers
};