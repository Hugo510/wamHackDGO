const Doctor = require('../models/doctor.model');

// Crear un nuevo doctor
const createDoctor = async (req, res) => {
    try {
        const { nombre, especialidad, cedulaProfesional, telefono, email, clinica, especialidadesSecundarias, estudios, rol } = req.body;

        const nuevoDoctor = new Doctor({
            nombre,
            especialidad,
            cedulaProfesional,
            telefono,
            email,
            clinica,
            especialidadesSecundarias,
            estudios,
            rol,
        });

        await nuevoDoctor.save();
        res.status(201).json(nuevoDoctor);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el doctor' });
    }
};

// Obtener todos los doctores
const getDoctors = async (req, res) => {
    try {
        const doctores = await Doctor.find().populate('clinica rol');
        res.status(200).json(doctores);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener doctores' });
    }
};

// Obtener un doctor por ID
const getDoctorById = async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.id).populate('clinica rol');
        if (!doctor) {
            return res.status(404).json({ error: 'Doctor no encontrado' });
        }
        res.status(200).json(doctor);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el doctor' });
    }
};

// Actualizar un doctor
const updateDoctor = async (req, res) => {
    try {
        const { nombre, especialidad, cedulaProfesional, telefono, email, clinica, especialidadesSecundarias, estudios, rol } = req.body;
        const doctor = await Doctor.findById(req.params.id);

        if (!doctor) {
            return res.status(404).json({ error: 'Doctor no encontrado' });
        }

        // Actualizar los campos
        doctor.nombre = nombre || doctor.nombre;
        doctor.especialidad = especialidad || doctor.especialidad;
        doctor.cedulaProfesional = cedulaProfesional || doctor.cedulaProfesional;
        doctor.telefono = telefono || doctor.telefono;
        doctor.email = email || doctor.email;
        doctor.clinica = clinica || doctor.clinica;
        doctor.especialidadesSecundarias = especialidadesSecundarias || doctor.especialidadesSecundarias;
        doctor.estudios = estudios || doctor.estudios;
        doctor.rol = rol || doctor.rol;

        await doctor.save();
        res.status(200).json(doctor);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el doctor' });
    }
};

// Eliminar un doctor
const deleteDoctor = async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.id);

        if (!doctor) {
            return res.status(404).json({ error: 'Doctor no encontrado' });
        }

        await doctor.remove();
        res.status(200).json({ message: 'Doctor eliminado' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el doctor' });
    }
};

module.exports = {
    createDoctor,
    getDoctors,
    getDoctorById,
    updateDoctor,
    deleteDoctor
};
