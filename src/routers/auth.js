const express = require('express');
const { registerUser, loginUser, refreshSession, logoutUser } = require('../controllers/auth');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/refresh', refreshSession);
router.post('/logout', logoutUser);

module.exports = router;
