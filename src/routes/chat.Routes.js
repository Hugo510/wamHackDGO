// routes/chatRoutes.js
const express = require('express');
const router = express.Router();
const { formatText } = require('../controllers/chat.Controller');

// Ruta para procesar texto con ChatGPT
router.post('/format', formatText);

module.exports = router;
