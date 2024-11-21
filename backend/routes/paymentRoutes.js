const express = require("express");
const authenticateToken = require("../middleware/authMiddleware");
const {
  withdrawRequest,
  getWithdrawRequest,
  // braintreeTokenController,
  // braintreePaymentController,
} = require("../controllers/paymentController");
const router = express.Router();

router.post("/request", authenticateToken, withdrawRequest);
router.get("/get", authenticateToken, getWithdrawRequest);
// router.get("/braintee/token", braintreeTokenController);
// router.post(
//   "/braintree/payment",
//   authenticateToken,
//   braintreePaymentController
// );
module.exports = router;
