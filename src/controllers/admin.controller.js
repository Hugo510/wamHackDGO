// controllers/administradorController.js
const Administrador = require('../models/admin.model');

// Crear un nuevo administrador
const createAdministrador = async (req, res) => {
    try {
        const { nombre, email, telefono, rol } = req.body;

        const nuevoAdministrador = new Administrador({
            nombre,
            email,
            telefono,
            rol,
        });

        await nuevoAdministrador.save();
        res.status(201).json(nuevoAdministrador);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear administrador' });
    }
};

// Obtener todos los administradores
const getAdministradores = async (req, res) => {
    try {
        const administradores = await Administrador.find().populate('rol');
        res.status(200).json(administradores);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener administradores' });
    }
};

// Obtener un administrador por ID
const getAdministradorById = async (req, res) => {
    try {
        const administrador = await Administrador.findById(req.params.id).populate('rol');
        if (!administrador) {
            return res.status(404).json({ error: 'Administrador no encontrado' });
        }
        res.status(200).json(administrador);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener administrador' });
    }
};

// Actualizar un administrador
const updateAdministrador = async (req, res) => {
    try {
        const { nombre, email, telefono, rol } = req.body;
        const administrador = await Administrador.findById(req.params.id);

        if (!administrador) {
            return res.status(404).json({ error: 'Administrador no encontrado' });
        }

        administrador.nombre = nombre || administrador.nombre;
        administrador.email = email || administrador.email;
        administrador.telefono = telefono || administrador.telefono;
        administrador.rol = rol || administrador.rol;

        await administrador.save();
        res.status(200).json(administrador);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar administrador' });
    }
};

// Eliminar un administrador
const deleteAdministrador = async (req, res) => {
    try {
        const administrador = await Administrador.findById(req.params.id);

        if (!administrador) {
            return res.status(404).json({ error: 'Administrador no encontrado' });
        }

        await administrador.remove();
        res.status(200).json({ message: 'Administrador eliminado' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar administrador' });
    }
};

module.exports = {
    createAdministrador,
    getAdministradores,
    getAdministradorById,
    updateAdministrador,
    deleteAdministrador
};
