const express = require("express")
const {createReservation} = require("../controllers/reservationController")
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();
router.post("/create",authenticateToken,createReservation)

module.exports = router;