const mongoose = require('mongoose');
const rolSchema = new mongoose.Schema({
    nombre: { 
        type: String, 
        enum: ['Paciente', 'Doctor', 'Administrador'], 
        required: true 
    },
    descripcion: String
});

const Rol = mongoose.model('Rol', rolSchema);
module.exports = Rol;
