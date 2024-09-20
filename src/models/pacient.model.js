const mongoose = require('mongoose');
const pacienteSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    edad: { type: Number, required: true },
    sexo: { type: String, enum: ['Masculino', 'Femenino', 'Otro'], required: true },
    peso: { type: Number, required: true },
    altura: { type: Number, required: true },
    motivoConsulta: { type: String, required: true },
    antecedentePersonalesNoPatologicos: {
        ocupacion: String,
        estadoCivil: String,
        tabaquismo: Boolean,
        alcoholismo: Boolean,
        drogas: Boolean,
        ejercicio: String, // Frecuencia, tipo, etc.
        alimentacion: String, // Dieta, hábitos alimenticios
    },
    antecedentePersonalesPatologicos: {
        enfermedadesPrevias: [String],
        cirugiasPrevias: [String],
        alergias: [String],
        medicamentosActuales: [String],
        hospitalizacionesPrevias: [String]
    },
    antecedentesHeredoFamiliares: {
        diabetes: Boolean,
        hipertension: Boolean,
        cardiopatias: Boolean,
        cancer: Boolean,
        otros: [String]
    },
    exploracionFisica: {
        presionArterial: String,
        frecuenciaCardiaca: String,
        frecuenciaRespiratoria: String,
        temperatura: String,
        saturacionOxigeno: String,
        otros: String
    },
    contactoEmergencia: {
        nombre: String,
        telefono: String,
        parentesco: String
    },
    rol: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Rol',
        required: true
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const Paciente = mongoose.model('Paciente', pacienteSchema);
module.exports = Paciente;
