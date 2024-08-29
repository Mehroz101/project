// backend/server.js

// Import necessary modules
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

// Import the database connection module
const { connectDB, checkDatabaseConnection } = require("./config/db");

// Initialize the Express application
const app = express();

// Load environment variables from .env file
dotenv.config();

// Set the port from environment variables or default to 5000
const PORT = process.env.PORT || 5000;

// Enable CORS for the specified client URL
app.use(
  cors({
    origin: process.env.CLIENT_URL,
  })
);

// Enable JSON request parsing
app.use(express.json());

// Establish the database connection
connectDB();

// Use the middleware to verify database connectivity for all routes
app.use(checkDatabaseConnection);

// Define a simple route
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
