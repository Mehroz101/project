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
  reservedReservation,
  getSpaceSpecificReservations,
  postReview,
  getReservationReview,
  braintreeTokenController,
  braintreePaymentController,
} = require("../controllers/reservationController");
const authenticateToken = require("../middleware/authMiddleware");

const router = express.Router();
router.post(
  "/createCustomReservation",
  authenticateToken,
  createCustomReservation
);
router.post("/createReservation", authenticateToken, createReservation);
router.post("/postreview", authenticateToken, postReview);
router.get("/get", authenticateToken, getReservation);
router.get("/getallreservation", getAllReservation);
router.get("/getuserreservation", authenticateToken, getUserReservation);
router.get("/get/:reservationId", authenticateToken, getReservationData);
router.get(
  "/getspacespecificreservation/:spaceId",
  getSpaceSpecificReservations
);
router.get("/getreservationreview/:reservationId", getReservationReview);
router.patch("/cancel", authenticateToken, cancelReservation);
router.patch("/confirm", authenticateToken, confirmReservation);
router.patch("/reserved", authenticateToken, reservedReservation);
router.get("/braintree/token", braintreeTokenController);
router.post(
  "/braintree/payment",
  authenticateToken,
  braintreePaymentController
);
module.exports = router;
