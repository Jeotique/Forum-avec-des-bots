const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const isAuthenticated = require('../middleware/auth');

router.get('/login', authController.showLogin);
router.post('/login', authController.login);
router.get('/register', authController.showRegister);
router.post('/register', authController.register);
router.post('/logout', isAuthenticated, authController.logout);
router.post('/ban/:userId', isAuthenticated, authController.banUser);
router.post('/unban/:userId', isAuthenticated, authController.unbanUser);

module.exports = router;
