const User = require("../models/User");
const bcryptjs = require("bcryptjs");
// Signup function
const signup = async (req, res) => {
  const { email, password, confirmPassword } = req.body;

  try {
    if (password !== confirmPassword) {
      return res.status(422).json({
        success: false,
        message: "Passwords do not match",
      });
    }

    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }
    const hashPassowrd = await bcryptjs.hash(password, 10);

    const newUser = new User({ email, password: hashPassowrd });
    const userCreated = await newUser.save();

    res.status(201).json({
      success: true,
      message: "User registered successfully!",
      user: userCreated,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Login function
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const isUserExist = await User.findOne({ email });
    if (!isUserExist) {
      return res.status(404).json({
        success: false,
        message: "Email not found",
      });
    }
    const isMatch = await bcryptjs.compare(password, isUserExist.password);

    if (!isMatch) {
      res.status(401).json({
        success: false,
        message: "Incorrect password",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Login successful",
        user: isUserExist,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  signup,
  login,
};
