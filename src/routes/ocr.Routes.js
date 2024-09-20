// routes/ocrRoutes.js
const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { extractAndProcessText } = require('../controllers/ocr.Controller');

// Ruta para subir una imagen y realizar OCR
router.post('/extract', upload.single('file'), extractAndProcessText);

module.exports = router;
