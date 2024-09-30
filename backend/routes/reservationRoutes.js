const express = require("express");
const {
  createCustomReservation,
  createReservation,
  getReservation,
  cancelReservation,
  confirmReservation,
  getReservationData,
  getUserReservation,
  getAllReservation,
} = require("../controllers/reservationController");
const authenticateToken = require("../middleware/authMiddleware");

const router = express.Router();
router.post(
  "/createCustomReservation",
  authenticateToken,
  createCustomReservation
);
router.post("/createReservation", authenticateToken, createReservation);
router.get("/get", authenticateToken, getReservation);
router.get("/getallreservation", authenticateToken, getAllReservation);
router.get("/getuserreservation", authenticateToken, getUserReservation);
router.get("/get/:reservationId", authenticateToken, getReservationData);
router.patch("/cancel", authenticateToken, cancelReservation);
router.patch("/confirm", authenticateToken, confirmReservation);

module.exports = router;
