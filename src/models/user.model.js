// models/Usuario.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const usuarioSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  contraseña: { type: String, required: true },
  rol: {
    type: String,
    enum: ['Paciente', 'Doctor', 'Administrador'],
    required: true
  },
  referencia: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: 'rol' // Esto referenciará al modelo según el rol
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Middleware para encriptar la contraseña antes de guardarla
usuarioSchema.pre('save', async function(next) {
  if (this.isModified('contraseña')) {
    this.contraseña = await bcrypt.hash(this.contraseña, 10);
  }
  next();
});

// Método para comparar contraseñas
usuarioSchema.methods.comparePassword = function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.contraseña);
};

const Usuario = mongoose.model('Usuario', usuarioSchema);
module.exports = Usuario;
