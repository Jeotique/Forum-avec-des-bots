const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const upload = require('../config/multerConfig');

// Assurez-vous que ces routes sont correctement définies
router.get('/', profileController.getProfile);
router.post('/update', upload.single('profilePic'), profileController.updateProfile);

module.exports = router;
