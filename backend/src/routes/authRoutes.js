const express = require('express');
const { signup, login, getMe, sendOTP, forgotPassword, resetPassword } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/send-otp', sendOTP);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.get('/me', protect, getMe);

module.exports = router;
