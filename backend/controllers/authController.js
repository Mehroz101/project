const User = require("../models/User");
const bcryptjs = require("bcryptjs");
const crypto = require("crypto"); // Signup function
const sendEmail = require("../utils/sendEmail");
const { generateToken } = require("../utils/generateToken");
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
      const token = generateToken(isUserExist); // Generate JWT token
      console.log(token);
      res.status(200).json({
        success: true,
        message: "Login successful",
        user: isUserExist,
        token,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
const forget = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Email not found",
      });
    }

    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetPasswordExpires = Date.now() + 3600000; // 1 hour

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = resetPasswordExpires;
    await user.save();

    const resetUrl = `${process.env.CLIENT_URL}/resetpassword/${resetToken}`;
    const message = `You are receiving this email because you (or someone else) has requested a password reset. Please make a PUT request to the following link to complete the process: \n\n${resetUrl}`;
    console.log("BASE_URL:", process.env.BASE_URL); // This should print "http://localhost:5000"

    const isSend = await sendEmail(email, "Password Reset", message);

    if (200) {
      return res.status(200).json({
        success: true,
        message: "Check your email",
        user: user, // Fixed: Return the actual user object
      });
    } else {
      return res.status(500).json({
        success: false,
        message: "Failed to send email",
      });
    }
  } catch (error) {
    console.error("Error in forget password:", error); // Log the error
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
const resetpass = async (req, res) => {
  const { token, password } = req.body; // Extract the new password from the request body
  // console.log("Token:", token);
  // console.log("Password:", password);
  // console.log("Request Body:", req.body);
  // console.log("Request Body:", req);
  try {
    // Find the user by the reset token and ensure the token hasn't expired
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }, // Check if the token is still valid
    });

    // If no user is found, respond with an error
    if (!user) {
      return res
        .status(400)
        .json({ msg: "Password reset token is invalid or has expired" });
    }
    const hashPassowrd = await bcryptjs.hash(password, 10);

    // Update the user's password and clear the reset token and expiration
    user.password = hashPassowrd;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    // Save the updated user information
    await user.save();

    // Send a success response
    res.json({ msg: "Password has been reset" });
  } catch (err) {
    // If an error occurs, log it and send a server error response
    console.error(err.message);
    res.status(500).send("Server error");
  }
};


module.exports = {
  signup,
  login,
  forget,
  resetpass,
};
