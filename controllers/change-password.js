const  User = require("../modules/users.js");
const changePwd = async (req, res) => {
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
}
module.exports = {
changePwd
}