// routes/administradorRoutes.js
const express = require('express');
const router = express.Router();
const { createAdministrador, getAdministradores, getAdministradorById, updateAdministrador, deleteAdministrador } = require('../controllers/admin.controller');
const authorizeRole = require('../middleware/authorizeRole');

// Solo los administradores pueden acceder a estas rutas
router.post('/', authorizeRole(['Administrador']), createAdministrador);
router.get('/', authorizeRole(['Administrador']), getAdministradores);
router.get('/:id', authorizeRole(['Administrador']), getAdministradorById);
router.put('/:id', authorizeRole(['Administrador']), updateAdministrador);
router.delete('/:id', authorizeRole(['Administrador']), deleteAdministrador);

module.exports = router;
