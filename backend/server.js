const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes"); // Ensure this is correct
const userRoutes = require("./routes/userRoutes"); // Ensure this is correct
const spaceRoutes = require("./routes/spaceRoutes"); // Ensure this is correct
const { connectDB, checkDatabaseConnection } = require("./config/db");
const path = require('path');
require('dotenv').config();

const app = express();
app.use(express.static(path.join(__dirname, 'uploads'))); // Serve static files from uploads directory

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

connectDB();
app.use(checkDatabaseConnection);  // This should work fine as it is a function

app.use("/api/auth", authRoutes);  
app.use("/api/user", userRoutes); 
app.use('/api/spaces', spaceRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
