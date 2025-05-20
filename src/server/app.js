// src/server/app.js
const express = require('express');
const app = express();

// Middleware
app.use(express.json());

// Basit route
app.get('/', (req, res) => {
  res.send('API is running...');
});

module.exports = app; 
