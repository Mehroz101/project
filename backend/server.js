const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const spaceRoutes = require("./routes/spaceRoutes");
const reservationRoutes = require("./routes/reservationRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const { connectDB, checkDatabaseConnection } = require("./config/db");
const path = require("path");
const http = require("http");
const socketIo = require("socket.io");
const attachSocketIo = require("./middleware/socketMiddleware"); // Import the middleware
require("dotenv").config();

const app = express();
const server = http.createServer(app); // Create HTTP server for socket.io
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PATCH"],
  },
});

const PORT = process.env.PORT || 5000;

// Middleware and Routes
app.use(cors());
app.use(express.json());
connectDB();
app.use(checkDatabaseConnection);

// Serve static files
app.use(express.static(path.join(__dirname, "uploads")));
// Expose the io instance to the whole app for use in routes/controllers
app.set("io", io);
// Apply the attachSocketIo middleware for specific routes
app.use("/api/spaces", spaceRoutes);
app.use("/api/reservation", reservationRoutes);
app.use("/api/withdraw", paymentRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
// const HOST = '0.0.0.0'; // Change this from 'localhost' to '0.0.0.0'

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
// server.listen(PORT,HOST, () => {
//   console.log(`Server is running on port ${PORT} ${HOST}`);
// });
