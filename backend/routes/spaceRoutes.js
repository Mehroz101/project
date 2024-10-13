const express = require("express");
const router = express.Router();
const uploadMiddleware = require("../middleware/uploadMiddleware");
const multer = require("multer");
const {
  createSpace,
  showSpace,
  toggleSpaceStatus,
  getspacedetail,
  updateSpaceDetails,
  deleteSpace,
  getallspaces,
  getspacedetailforreservation,
  getSpaceReview,
} = require("../controllers/spaceController");
const authenticateToken = require("../middleware/authMiddleware");

const upload = multer({ dest: "uploads/" });

// Route to create a new space with file upload
router.post("/create", authenticateToken, uploadMiddleware, createSpace);
router.get("/show", authenticateToken, showSpace);
router.patch("/update", authenticateToken, toggleSpaceStatus);
router.get("/getspacedetail/:spaceId", authenticateToken, getspacedetail);
router.get(
  "/getspacedetailforreservation/:spaceId",
  authenticateToken,
  getspacedetailforreservation
);
router.put(
  "/updatespacedetail/:spaceId",
  authenticateToken,
  uploadMiddleware,
  updateSpaceDetails
);
router.delete("/deletespace/:spaceId", authenticateToken, deleteSpace);

router.get("/getallspaces", getallspaces);
router.get("/getspacereview/:spaceId", getSpaceReview);

module.exports = router;
