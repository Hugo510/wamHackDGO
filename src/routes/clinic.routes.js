const express = require('express');
const router = express.Router();
const { createClinic, getClinics, getClinicById, updateClinic, deleteClinic } = require('../controllers/clinic.controller');
const authorizeRole = require('../middleware/authorizeRole');

// Solo los administradores pueden crear nuevas clínicas
router.post('/', authorizeRole(['Administrador']), createClinic);

// Administradores, doctores y pacientes pueden ver todas las clínicas
router.get('/', authorizeRole(['Administrador', 'Doctor', 'Paciente']), getClinics);

// Administradores, doctores y pacientes pueden ver una clínica por ID
router.get('/:id', authorizeRole(['Administrador', 'Doctor', 'Paciente']), getClinicById);

// Solo administradores pueden actualizar una clínica
router.put('/:id', authorizeRole(['Administrador']), updateClinic);

// Solo administradores pueden eliminar una clínica
router.delete('/:id', authorizeRole(['Administrador']), deleteClinic);

module.exports = router;
