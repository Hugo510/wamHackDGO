// controllers/chatController.js
const { processText } = require('../services/openAIService');

const formatText = async (req, res) => {
    try {
        const { text } = req.body;
        if (!text) {
            return res.status(400).json({ error: 'No se proporcionó texto para procesar.' });
        }

        const formattedText = await processText(text);
        res.status(200).json({ formattedText });
    } catch (error) {
        console.error('Error en formatText:', error);
        res.status(500).json({ error: 'Error al procesar el texto.' });
    }
};

module.exports = { formatText };
