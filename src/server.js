// server.js
const app = require('./app'); // Importa la aplicación desde app.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const ocrRoutes = require('./routes/ocrRoutes');
const chatRoutes = require('./routes/chatRoutes');

dotenv.config();

const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB conectado'))
.catch(err => console.error('Error de conexión a MongoDB:', err));

// Rutas
app.use('/api/ocr', ocrRoutes);
app.use('/api/chat', chatRoutes);

// Manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Algo salió mal!' });
});

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
