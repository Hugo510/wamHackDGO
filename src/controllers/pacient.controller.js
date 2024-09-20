const Paciente = require('../models/pacient.model'); // Asegúrate de la ruta correcta del modelo

// Crear un nuevo paciente
exports.createPaciente = async (req, res) => {
    try {
        const paciente = new Paciente(req.body);
        await paciente.save();
        res.status(201).json({ message: 'Paciente creado exitosamente', paciente });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el paciente', error });
    }
};

// Obtener todos los pacientes
exports.getPacientes = async (req, res) => {
    try {
        const pacientes = await Paciente.find().populate('rol');
        res.status(200).json(pacientes);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los pacientes', error });
    }
};

// Obtener un paciente por ID
exports.getPacienteById = async (req, res) => {
    try {
        const paciente = await Paciente.findById(req.params.id).populate('rol');
        if (!paciente) {
            return res.status(404).json({ message: 'Paciente no encontrado' });
        }
        res.status(200).json(paciente);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el paciente', error });
    }
};

// Actualizar un paciente
exports.updatePaciente = async (req, res) => {
    try {
        const paciente = await Paciente.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!paciente) {
            return res.status(404).json({ message: 'Paciente no encontrado' });
        }
        res.status(200).json({ message: 'Paciente actualizado exitosamente', paciente });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el paciente', error });
    }
};

// Eliminar un paciente
exports.deletePaciente = async (req, res) => {
    try {
        const paciente = await Paciente.findByIdAndDelete(req.params.id);
        if (!paciente) {
            return res.status(404).json({ message: 'Paciente no encontrado' });
        }
        res.status(200).json({ message: 'Paciente eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el paciente', error });
    }
};
