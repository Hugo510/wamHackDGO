const express = require('express');
const router = express.Router();
const { createDoctor, getDoctors, getDoctorById, updateDoctor, deleteDoctor } = require('../controllers/doctor.controller');
const authorizeRole = require('../middleware/authorizeRole');

// Solo los administradores pueden crear nuevos doctores
router.post('/', authorizeRole(['Administrador']), createDoctor);

// Administradores y doctores pueden ver todos los doctores
router.get('/', authorizeRole(['Administrador', 'Doctor']), getDoctors);

// Pacientes, doctores y administradores pueden ver un doctor por ID
router.get('/:id', authorizeRole(['Paciente', 'Doctor', 'Administrador']), getDoctorById);

// Solo los administradores pueden actualizar un doctor
router.put('/:id', authorizeRole(['Administrador']), updateDoctor);

// Solo los administradores pueden eliminar un doctor
router.delete('/:id', authorizeRole(['Administrador']), deleteDoctor);

module.exports = router;
