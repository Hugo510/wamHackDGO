const doctorSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    especialidad: { type: String, required: true },
    cedulaProfesional: { type: String, required: true },
    telefono: { type: String, required: true },
    email: { type: String, required: true },
    clinica: { type: mongoose.Schema.Types.ObjectId, ref: 'Clinica' },
    horario: {
        lunesAViernes: { type: String, required: true }, // Ejemplo: "9:00 - 15:00"
        sabado: String,
        domingo: String
    },
    citas: [{
        paciente: { type: mongoose.Schema.Types.ObjectId, ref: 'Paciente' },
        fecha: { type: Date, required: true },
        motivoCita: { type: String, required: true },
        estatus: { type: String, enum: ['Pendiente', 'Confirmada', 'Cancelada'], default: 'Pendiente' }
    }],
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
