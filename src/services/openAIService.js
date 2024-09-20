const axios = require('axios');
const config = require('../config/config');

const processText = async (text) => {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4',
        messages: [
          { role: 'system', content: 'Eres un asistente que ordena y formatea textos extraídos de imágenes.' },
          { role: 'user', content: `Ordena y formatea el siguiente texto: ${text}` },
        ],
        max_tokens: 1000,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${config.openAI.apiKey}`,
        },
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    throw error;
  }
};

module.exports = { processText };
