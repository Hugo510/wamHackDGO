const express = require('express');
const router = express.Router();
const rolController = require('../controllers/rol.controller'); // Asegúrate de la ruta correcta del controlador

// Crear un nuevo rol
router.post('/', rolController.createRol);

// Obtener todos los roles
router.get('/', rolController.getRoles);

// Obtener un rol por ID
router.get('/:id', rolController.getRolById);

// Actualizar un rol
router.put('/:id', rolController.updateRol);

// Eliminar un rol
router.delete('/:id', rolController.deleteRol);

module.exports = router;
