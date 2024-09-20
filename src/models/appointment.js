const mongoose = require('mongoose');
const citaSchema = new mongoose.Schema({
    paciente: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Paciente', 
        required: true 
    },
    doctor: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Doctor', 
        required: true 
    },
    clinica: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Clinica', 
        required: true 
    },
    fecha: { 
        type: Date, 
        required: true 
    },
    motivoCita: { 
        type: String, 
        required: true 
    },
    estatus: { 
        type: String, 
        enum: ['Pendiente', 'Confirmada', 'Cancelada', 'Completada'], 
        default: 'Pendiente' 
    },
    notasDoctor: String, // Campo para que el doctor añada notas después de la consulta
    recetas: [String], // Medicamentos recetados durante la cita
    diagnosticos: [String], // Diagnósticos realizados durante la cita
    tratamientos: [String], // Tratamientos sugeridos durante la consulta
    duracionCita: { 
        type: Number, 
        default: 30  // Duración de la cita en minutos
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
    updatedAt: { 
        type: Date, 
        default: Date.now 
    }
});

const Cita = mongoose.model('Cita', citaSchema);
module.exports = Cita;
