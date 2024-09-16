const express = require("express")
const {createReservation,getReservation,cancelReservation,confirmReservation,getReservationData} = require("../controllers/reservationController")
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();
router.post("/create",authenticateToken,createReservation)
router.get("/get",authenticateToken,getReservation)
router.get("/get/:reservationId",authenticateToken,getReservationData)
router.patch("/cancel",authenticateToken,cancelReservation)
router.patch("/confirm",authenticateToken,confirmReservation)

module.exports = router;