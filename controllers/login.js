const  User = require("../modules/users.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const loginUsers = async (req, res) => {
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
}
module.exports = {
loginUsers
}