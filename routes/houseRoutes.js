// routes/houseRoutes.js
const express = require('express');
const router = express.Router();
const houseController = require('../controllers/houseController');
const multer = require('multer');
const path = require('path');

// Configure multer for file uploads. Files are stored in the "uploads" folder.
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});
const upload = multer({ storage: storage });

// POST route to create a new house entry (with image upload handling)
router.post('/houses', upload.single('image'), houseController.createHouseEntry);

// GET route to fetch all house entries
router.get('/houses', houseController.getHouseEntries);

module.exports = router;
