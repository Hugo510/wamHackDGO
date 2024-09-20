const Rol = require('../models/rol.model'); // Asegúrate de la ruta correcta del modelo

// Crear un nuevo rol
exports.createRol = async (req, res) => {
    try {
        const rol = new Rol(req.body);
        await rol.save();
        res.status(201).json({ message: 'Rol creado exitosamente', rol });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el rol', error });
    }
};

// Obtener todos los roles
exports.getRoles = async (req, res) => {
    try {
        const roles = await Rol.find();
        res.status(200).json(roles);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los roles', error });
    }
};

// Obtener un rol por ID
exports.getRolById = async (req, res) => {
    try {
        const rol = await Rol.findById(req.params.id);
        if (!rol) {
            return res.status(404).json({ message: 'Rol no encontrado' });
        }
        res.status(200).json(rol);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el rol', error });
    }
};

// Actualizar un rol
exports.updateRol = async (req, res) => {
    try {
        const rol = await Rol.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!rol) {
            return res.status(404).json({ message: 'Rol no encontrado' });
        }
        res.status(200).json({ message: 'Rol actualizado exitosamente', rol });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el rol', error });
    }
};

// Eliminar un rol
exports.deleteRol = async (req, res) => {
    try {
        const rol = await Rol.findByIdAndDelete(req.params.id);
        if (!rol) {
            return res.status(404).json({ message: 'Rol no encontrado' });
        }
        res.status(200).json({ message: 'Rol eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el rol', error });
    }
};
