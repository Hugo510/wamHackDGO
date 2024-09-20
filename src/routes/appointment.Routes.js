const express = require('express');
const router = express.Router();
const { createAppointment, getAppointments, getAppointmentById, updateAppointment, deleteAppointment } = require('../controllers/appointment.controller');
const authorizeRole = require('../middleware/authorizeRole');

// Solo doctores o administradores pueden crear citas
router.post('/', authorizeRole(['Doctor', 'Administrador']), createAppointment);

// Los administradores y doctores pueden ver todas las citas
router.get('/', authorizeRole(['Administrador', 'Doctor']), getAppointments);

// Obtener una cita por ID (solo pacientes, doctores o administradores pueden acceder)
router.get('/:id', authorizeRole(['Paciente', 'Doctor', 'Administrador']), getAppointmentById);

// Actualizar una cita (solo doctores y administradores pueden actualizar)
router.put('/:id', authorizeRole(['Doctor', 'Administrador']), updateAppointment);

// Eliminar una cita (solo administradores pueden eliminar)
router.delete('/:id', authorizeRole(['Administrador']), deleteAppointment);

module.exports = router;
