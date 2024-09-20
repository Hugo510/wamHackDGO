const administradorSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    email: { type: String, required: true },
    telefono: { type: String, required: true },
    rol: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Rol', 
        required: true 
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const Administrador = mongoose.model('Administrador', administradorSchema);
module.exports = Administrador;
