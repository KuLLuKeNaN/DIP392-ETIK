const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Kullanıcı kaydı (Register)
router.post('/register', async (req, res) => {
  const { name, surname, birthday, phone, email, password } = req.body;

  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email zaten kayıtlı' });

    const user = new User({ name, surname, birthday, phone, email, password });
    await user.save();
    res.status(201).json({ message: 'Kayıt başarılı' });
  } catch (err) {
    res.status(500).json({ error: 'Kayıt başarısız' });
  }
});

// Kullanıcı girişi (Login)
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Kullanıcı bulunamadı' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: 'Şifre yanlış' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ message: 'Giriş başarılı', token });
  } catch (err) {
    res.status(500).json({ error: 'Giriş hatası' });
  }
});

module.exports = router;