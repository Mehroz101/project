const express = require('express');
const router = express.Router();
const uploadMiddleware = require('../middleware/uploadMiddleware');
const {createSpace,showSpace,toggleSpaceStatus} = require('../controllers/spaceController');
const multer = require('multer');
const authenticateToken = require('../middleware/authMiddleware');

const upload = multer({ dest: 'uploads/' })

// Route to create a new space with file upload
router.post('/create', authenticateToken, uploadMiddleware, createSpace);
router.get('/show',authenticateToken ,showSpace);
router.patch("/update", authenticateToken, toggleSpaceStatus);

module.exports = router;
