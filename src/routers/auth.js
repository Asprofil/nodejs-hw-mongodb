const express = require('express');
const { sendResetEmail, resetPassword } = require('../controllers/auth');
const { validateBody } = require('../middlewares/validateBody');
const { body } = require('express-validator');

const router = express.Router();

router.post('/auth/send-reset-email', [
  body('email').isEmail().withMessage('Invalid email address'),
], validateBody, sendResetEmail);

router.post('/auth/reset-pwd', [
  body('token').notEmpty().withMessage('Token is required'),
  body('password').isLength({ min: 6 }).withMessage('Password should be at least 6 characters long'),
], validateBody, resetPassword);

module.exports = router;
