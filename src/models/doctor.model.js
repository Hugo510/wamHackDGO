const mongoose = require('mongoose');
const doctorSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    especialidad: { type: String, required: true },
    cedulaProfesional: { type: String, required: true },
    telefono: { type: String, required: true },
    email: { type: String, required: true },
    clinica: { type: mongoose.Schema.Types.ObjectId, ref: 'Clinica' },
    especialidadesSecundarias: [String],
    estudios: {
        universidad: String,
        anioGraduacion: Number,
        otrosEstudios: [String]
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const Doctor = mongoose.model('Doctor', doctorSchema);
module.exports = Doctor;
