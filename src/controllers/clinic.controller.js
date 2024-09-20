const Clinica = require('../models/clinic.model');

// Crear una nueva clínica
const createClinic = async (req, res) => {
    try {
        const { nombre, direccion, telefono, email, horarios, servicios, doctoresDisponibles } = req.body;

        const nuevaClinica = new Clinica({
            nombre,
            direccion,
            telefono,
            email,
            horarios,
            servicios,
            doctoresDisponibles,
        });

        await nuevaClinica.save();
        res.status(201).json(nuevaClinica);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear la clínica' });
    }
};

// Obtener todas las clínicas
const getClinics = async (req, res) => {
    try {
        const clinicas = await Clinica.find().populate('doctoresDisponibles citas.paciente citas.doctor');
        res.status(200).json(clinicas);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las clínicas' });
    }
};

// Obtener una clínica por ID
const getClinicById = async (req, res) => {
    try {
        const clinica = await Clinica.findById(req.params.id).populate('doctoresDisponibles citas.paciente citas.doctor');
        if (!clinica) {
            return res.status(404).json({ error: 'Clínica no encontrada' });
        }
        res.status(200).json(clinica);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener la clínica' });
    }
};

// Actualizar una clínica
const updateClinic = async (req, res) => {
    try {
        const { nombre, direccion, telefono, email, horarios, servicios, doctoresDisponibles } = req.body;
        const clinica = await Clinica.findById(req.params.id);

        if (!clinica) {
            return res.status(404).json({ error: 'Clínica no encontrada' });
        }

        // Actualizar los campos
        clinica.nombre = nombre || clinica.nombre;
        clinica.direccion = direccion || clinica.direccion;
        clinica.telefono = telefono || clinica.telefono;
        clinica.email = email || clinica.email;
        clinica.horarios = horarios || clinica.horarios;
        clinica.servicios = servicios || clinica.servicios;
        clinica.doctoresDisponibles = doctoresDisponibles || clinica.doctoresDisponibles;

        await clinica.save();
        res.status(200).json(clinica);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar la clínica' });
    }
};

// Eliminar una clínica
const deleteClinic = async (req, res) => {
    try {
        const clinica = await Clinica.findById(req.params.id);

        if (!clinica) {
            return res.status(404).json({ error: 'Clínica no encontrada' });
        }

        await clinica.remove();
        res.status(200).json({ message: 'Clínica eliminada' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la clínica' });
    }
};

module.exports = {
    createClinic,
    getClinics,
    getClinicById,
    updateClinic,
    deleteClinic
};
