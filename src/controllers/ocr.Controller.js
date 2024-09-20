// controllers/ocrController.js
const { performOCR } = require('../services/googleVisionService');
const { processText } = require('../services/openAIService');

const extractAndProcessText = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No se subió ninguna imagen.' });
        }

        const imagePath = req.file.path;
        // Realizar OCR
        const extractedText = await performOCR(imagePath);

        // Procesar el texto con ChatGPT
        const processedText = await processText(extractedText);

        res.status(200).json({
            extractedText,
            processedText
        });
    } catch (error) {
        console.error('Error en extractAndProcessText:', error);
        res.status(500).json({ error: 'Error al procesar la imagen.' });
    }
};

module.exports = { extractAndProcessText };
