const express = require('express');
const router = express.Router();
const { updateProfile } = require('../controllers/userController');
const verifyToken = require('../middleware/verifyToken');
const verifyToken = require('../middleware/verifyToken');
const { getUserProfile } = require('../controllers/userController');

router.get('/me', verifyToken, getUserProfile);
// Kullanıcı profilini güncelle
router.put('/me', verifyToken, updateProfile);

module.exports = router;
