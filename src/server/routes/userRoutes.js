const express = require('express');
const router = express.Router();
const { updateProfile } = require('../controllers/userController');
const verifyToken = require('../middleware/verifyToken');

// Kullanıcı profilini güncelle
router.put('/me', verifyToken, updateProfile);

module.exports = router;
