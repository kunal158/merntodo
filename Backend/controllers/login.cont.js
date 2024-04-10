const bcrypt = require("bcrypt");
const User = require("../models/user.models");

// Controller function for user login
module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    // If user not found or password does not match, return error
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const responseData = {
      _id: user._id,
      email: user.email,
      // Add other user data as needed
    };

    // Send success response
    res.status(200).json({ message: "Login successful", user : responseData });
  } catch (error) {
    console.error("Error in login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
