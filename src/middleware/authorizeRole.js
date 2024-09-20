// middleware/authorizeRole.js
const authorizeRole = (rolesPermitidos) => {
    return (req, res, next) => {
        const { user } = req;  // Aquí asumimos que el usuario está en el req (tras autenticación previa)

        if (!user || !rolesPermitidos.includes(user.rol.nombre)) {
            return res.status(403).json({ error: 'No tienes permisos para realizar esta acción.' });
        }

        next(); // Permitir acceso si el rol está autorizado
    };
};

module.exports = authorizeRole;
