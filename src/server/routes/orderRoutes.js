const express = require('express');
const router = express.Router();

const { createOrder, getMyOrders } = require('../controllers/orderController');
const verifyToken = require('../middleware/verifyToken');

// Sipariş oluştur
router.post('/', verifyToken, createOrder);

// Kullanıcının sipariş geçmişi
router.get('/me', verifyToken, getMyOrders);

module.exports = router;
