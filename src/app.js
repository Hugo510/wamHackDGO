const morgan = require('morgan');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const hpp = require('hpp');
const rateLimit = require('express-rate-limit');
const compression = require('compression');
const { errors } = require('celebrate');

// Rutas
const achievementRoutes = require('./routes/achievement.routes');
const achievementUserCourseRoutes = require('./routes/achievementUserCourse.routes');

const app = express();


app.use(cors());
app.use(hpp());
app.use(compression());
app.use(morgan('dev'));
app.use(express.json());

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
app.use('/api/achievements', achievementRoutes);
app.use('/api/achievementUserCourse', achievementUserCourseRoutes);

// Manejo de errores con Celebrate
app.use(errors());

// Middleware para manejo de errores generales
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

module.exports = app;
