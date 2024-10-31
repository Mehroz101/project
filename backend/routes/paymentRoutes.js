const express = require("express");
const authenticateToken = require("../middleware/authMiddleware");
const {
  withdrawRequest,
  getWithdrawRequest,
} = require("../controllers/paymentController");
const router = express.Router();

router.post("/request", authenticateToken, withdrawRequest);
router.get("/get", authenticateToken, getWithdrawRequest);

module.exports = router;
