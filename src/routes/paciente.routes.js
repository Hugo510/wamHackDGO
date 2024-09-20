const express = require('express');
const router = express.Router();
const pacienteController = require('../controllers/pacient.controller'); // Asegúrate de la ruta correcta del controlador

// Crear un nuevo paciente
router.post('/', pacienteController.createPaciente);

// Obtener todos los pacientes
router.get('/', pacienteController.getPacientes);

// Obtener un paciente por ID
router.get('/:id', pacienteController.getPacienteById);

// Actualizar un paciente
router.put('/:id', pacienteController.updatePaciente);

// Eliminar un paciente
router.delete('/:id', pacienteController.deletePaciente);

module.exports = router;
