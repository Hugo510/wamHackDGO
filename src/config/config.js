// config/config.js
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    mongoURI: process.env.MONGO_URI,
    googleCloud: {
        projectId: process.env.GOOGLE_PROJECT_ID,
        keyFilename: './src/config/googleCloud.json', // Ruta al archivo de credenciales
    },
    openAI: {
        apiKey: process.env.OPENAI_KEY,
    },
    port: process.env.PORT || 5000,
};
