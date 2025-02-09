const express = require('express');
const router = express.Router();
const houseController = require('../controllers/houseController');
const multer = require('multer');
const path = require('path');

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

router.post('/houses', upload.single('image'), houseController.createHouseEntry);
router.get('/houses', houseController.getHouseEntries);
router.delete('/houses/:id', houseController.deleteHouseEntry);

module.exports = router;

