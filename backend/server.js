const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes"); // Ensure this is correct
const { connectDB, checkDatabaseConnection } = require("./config/db");

const app = express();

dotenv.config();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

connectDB();
app.use(checkDatabaseConnection);  // This should work fine as it is a function

app.use("/api/auth", authRoutes);  // This should also work fine if `authRoutes` is correctly imported

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
