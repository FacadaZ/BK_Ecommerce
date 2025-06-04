const { Usuario } = require('../models');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

exports.registrarUsuario = async (req, res) => {
    const { nombre, correo, password, rol } = req.body;

    try {
        const usuarioExistente = await Usuario.findOne({ where: { correo } });
        if (usuarioExistente) {
            return res.status(400).json({ error: "El usuario ya existe" });
        }

        const password_hash = await bcrypt.hash(password, 10);

        const nuevoUsuario = await Usuario.create({
            nombre,
            correo,
            password_hash,
            rol 
        });

        return res.status(201).json({ message: "Usuario registrado exitosamente", usuario: nuevoUsuario });
    } catch (error) {
        console.error("Error al registrar el usuario:", error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
};

exports.loginUsuario = async (req, res) => {
    const { correo, password } = req.body;

    try {
        const usuario = await Usuario.findOne({ where: { correo } });
        if (!usuario) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        // Compara el password ingresado con el hash guardado
        const passwordValido = await bcrypt.compare(password, usuario.password_hash);
        if (!passwordValido) {
            return res.status(401).json({ error: "Contraseña incorrecta" });
        }

        return res.status(200).json({ message: "Login exitoso", usuario });
    } catch (error) {
        console.error("Error al hacer login:", error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
};

// Obtener todos los usuarios con rol admin, Sub Admin o Vendedor
exports.obtenerAdmins = async (req, res) => {
    try {
        const admins = await Usuario.findAll({
            where: {
                rol: {
                    [Op.in]: ['admin', 'sub admin', 'vendedor']
                }
            }
        });
        return res.status(200).json(admins);
    } catch (error) {
        console.error("Error al obtener los administradores:", error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
};

// Obtener usuario por ID
exports.obtenerUsuarioPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }
        return res.status(200).json(usuario);
    } catch (error) {
        console.error("Error al obtener el usuario:", error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
};



exports.actualizarUsuario = async (req, res) => {
    const { id } = req.params;
    const { nombre, correo, password, rol } = req.body;
    try {
        if (!rol) {
            return res.status(400).json({ error: "El campo 'rol' es obligatorio" });
        }
        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        usuario.nombre = nombre;
        usuario.correo = correo;
        usuario.rol = rol;

        if (password && password.trim() !== "") {
            usuario.password_hash = await bcrypt.hash(password, 10);
        }

        await usuario.save();

        return res.status(200).json({ message: "Usuario actualizado exitosamente", usuario });
    } catch (error) {
        console.error("Error al actualizar el usuario:", error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
};

// Eliminar usuario
exports.eliminarUsuario = async (req, res) => {
    const { id } = req.params;
    try {
        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        await usuario.destroy();
        return res.status(200).json({ message: "Usuario eliminado exitosamente" });
    } catch (error) {
        console.error("Error al eliminar el usuario:", error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
};