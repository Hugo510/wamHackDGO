// controllers/auth.controller.js
const Usuario = require('../models/user.model');
const Paciente = require('../models/pacient.model');
const Doctor = require('../models/doctor.model');
const Administrador = require('../models/admin.model');

const login = async (req, res) => {
  const { email, contraseña } = req.body;

  try {
    // Buscar el usuario por email
    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
      return res.status(401).json({ mensaje: 'Credenciales inválidas' });
    }

    // Comparar la contraseña
    const esContraseñaCorrecta = await usuario.comparePassword(contraseña);

    if (!esContraseñaCorrecta) {
      return res.status(401).json({ mensaje: 'Credenciales inválidas' });
    }

    // Obtener información adicional según el rol
    let datosUsuario;

    switch (usuario.rol) {
      case 'Paciente':
        datosUsuario = await Paciente.findById(usuario.referencia);
        break;
      case 'Doctor':
        datosUsuario = await Doctor.findById(usuario.referencia);
        break;
      case 'Administrador':
        datosUsuario = await Administrador.findById(usuario.referencia);
        break;
      default:
        return res.status(400).json({ mensaje: 'Rol de usuario inválido' });
    }
    // Generar token de autenticación si es necesario (JWT)
    // const token = generarToken(usuario);

    // Redirigir o responder según el rol
    res.json({
      mensaje: 'Inicio de sesión exitoso',
      rol: usuario.rol,
      datos: datosUsuario,
      // token
    });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};

const registrar = async (req, res) => {
  const { email, contraseña, rol, datos } = req.body;

  try {
    // Verificar si el email ya existe
    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ mensaje: 'El email ya está en uso' });
    }

    // Crear el documento específico según el rol
    let referenciaId;

    switch (rol) {
      case 'Paciente':
        const nuevoPaciente = new Paciente(datos);
        await nuevoPaciente.save();
        referenciaId = nuevoPaciente._id;
        break;
      case 'Doctor':
        const nuevoDoctor = new Doctor(datos);
        await nuevoDoctor.save();
        referenciaId = nuevoDoctor._id;
        break;
      case 'Administrador':
        const nuevoAdmin = new Administrador(datos);
        await nuevoAdmin.save();
        referenciaId = nuevoAdmin._id;
        break;
      default:
        return res.status(400).json({ mensaje: 'Rol inválido' });
    }

    // Crear el usuario
    const nuevoUsuario = new Usuario({
      email,
      contraseña,
      rol,
      referencia: referenciaId
    });

    await nuevoUsuario.save();

    res.json({ mensaje: 'Usuario registrado exitosamente' });
  } catch (error) {
    console.error('Error en registrar:', error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};



module.exports = {login, registrar};

