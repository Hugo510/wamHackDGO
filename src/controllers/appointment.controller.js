const Cita = require('../models/appointment.model');

// Crear una nueva cita
const createAppointment = async (req, res) => {
    try {
        const { paciente, doctor, clinica, fecha, motivoCita, estatus, notasDoctor, recetas, diagnosticos, tratamientos, duracionCita } = req.body;

        const nuevaCita = new Cita({
            paciente,
            doctor,
            clinica,
            fecha,
            motivoCita,
            estatus,
            notasDoctor,
            recetas,
            diagnosticos,
            tratamientos,
            duracionCita,
        });

        await nuevaCita.save();
        res.status(201).json(nuevaCita);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear la cita' });
    }
};

// Obtener todas las citas
const getAppointments = async (req, res) => {
    try {
        const citas = await Cita.find().populate('paciente doctor clinica');
        res.status(200).json(citas);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener citas' });
    }
};

// Obtener una cita por ID
const getAppointmentById = async (req, res) => {
    try {
        const cita = await Cita.findById(req.params.id).populate('paciente doctor clinica');
        if (!cita) {
            return res.status(404).json({ error: 'Cita no encontrada' });
        }
        res.status(200).json(cita);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener la cita' });
    }
};

// Actualizar una cita
const updateAppointment = async (req, res) => {
    try {
        const { fecha, motivoCita, estatus, notasDoctor, recetas, diagnosticos, tratamientos, duracionCita } = req.body;
        const cita = await Cita.findById(req.params.id);

        if (!cita) {
            return res.status(404).json({ error: 'Cita no encontrada' });
        }

        // Actualizar los campos
        cita.fecha = fecha || cita.fecha;
        cita.motivoCita = motivoCita || cita.motivoCita;
        cita.estatus = estatus || cita.estatus;
        cita.notasDoctor = notasDoctor || cita.notasDoctor;
        cita.recetas = recetas || cita.recetas;
        cita.diagnosticos = diagnosticos || cita.diagnosticos;
        cita.tratamientos = tratamientos || cita.tratamientos;
        cita.duracionCita = duracionCita || cita.duracionCita;

        await cita.save();
        res.status(200).json(cita);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar la cita' });
    }
};

// Eliminar una cita
const deleteAppointment = async (req, res) => {
    try {
        const cita = await Cita.findById(req.params.id);

        if (!cita) {
            return res.status(404).json({ error: 'Cita no encontrada' });
        }

        await cita.remove();
        res.status(200).json({ message: 'Cita eliminada' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la cita' });
    }
};

module.exports = {
    createAppointment,
    getAppointments,
    getAppointmentById,
    updateAppointment,
    deleteAppointment
};
