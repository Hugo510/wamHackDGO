const mongoose = require('mongoose');
const clinicaSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    direccion: {
        calle: { type: String, required: true },
        numero: { type: String, required: true },
        colonia: { type: String, required: true },
        ciudad: { type: String, required: true },
        estado: { type: String, required: true },
        codigoPostal: { type: String, required: true },
    },
    telefono: { type: String, required: true },
    email: { type: String, required: true },
    horarios: {
        lunesAViernes: { type: String, required: true }, // Ejemplo: "8:00 - 18:00"
        sabado: String,
        domingo: String
    },
    servicios: [String], // Servicios que ofrece la clínica
    doctoresDisponibles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' }],
    citas: [{
        paciente: { type: mongoose.Schema.Types.ObjectId, ref: 'Paciente' },
        doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
        fecha: { type: Date, required: true },
        motivoCita: { type: String, required: true },
    }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const Clinica = mongoose.model('Clinica', clinicaSchema);
module.exports = Clinica;
