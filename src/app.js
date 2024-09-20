const morgan = require('morgan');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const hpp = require('hpp');
const rateLimit = require('express-rate-limit');
const compression = require('compression');
const { errors } = require('celebrate');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
require('dotenv').config();


// Rutas
const ocrRoutes = require('./routes/ocr.Routes');
const chatRoutes = require('./routes/chat.Routes');
const administradorRoutes = require('./routes/admin.Routes');
const appointmentRoutes = require('./routes/appointment.Routes');
const clinicRoutes = require('./routes/clinic.routes');
const doctorRoutes = require('./routes/doctor.routes');
const pacienteRoutes = require('./routes/paciente.routes'); 
const rolRoutes = require('./routes/rol.routes'); 
const authRoutes = require('./routes/auth.routes');


dotenv.config();

const app = express();


app.use(cors());
app.use(hpp());
app.use(compression());
app.use(morgan('dev'));
app.use(express.json());
app.use(bodyParser.json()); // Parsear JSON
app.use(bodyParser.urlencoded({ extended: true })); // Parsear formularios
app.use('/uploads', express.static('uploads'));


app.use((err, req, res, next) => {
    const statusCode = err.status || 500;
    const message = err.message || 'Error del servidor';
    debug('Manejo de error:', err.stack);

    res.status(statusCode).json({
        status: statusCode,
        message: message,
    });
});

// Limitar solicitudes para prevenir ataques de fuerza bruta
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 150, // límite de 150 solicitudes por IP
    message: 'Too many requests from this IP, please try again after 15 minutes'
});
app.use(limiter);

// Rutas aquí
app.use('/api/ocr', ocrRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/administradores', administradorRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/clinics', clinicRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/pacientes', pacienteRoutes);
app.use('/api/roles', rolRoutes);
app.use('/api/auth', authRoutes);




// Manejo de errores con Celebrate
app.use(errors());

// Middleware para manejo de errores generales
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

module.exports = app;
