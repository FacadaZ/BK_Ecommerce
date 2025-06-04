
const { Cupon, sequelize } = require('../models');
const { fn, col } = require('sequelize');


exports.obtenerCupones = async (req, res) => {
    try {
        const { codigo } = req.query;
        if (codigo) {
            const cupon = await Cupon.findOne({
                where: sequelize.where(
                    fn('lower', col('codigo')),
                    codigo.toLowerCase()
                )
            });
            if (!cupon) return res.status(404).json({ error: "Cupón no encontrado" });
            return res.json(cupon);
        }
        const cupones = await Cupon.findAll();
        res.status(200).json(cupones);
    } catch (error) {
        console.error('Error al obtener cupones:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};
exports.crearCupon = async (req, res) => {
    try {
        const { codigo, puntos, descuento } = req.body;
        if (!codigo) {
            return res.status(400).json({ error: 'El código es obligatorio.' });
        }
        const cupon = await Cupon.create({ codigo, puntos, descuento });
        res.status(201).json({ message: 'Cupón creado', cupon });
    } catch (error) {
        console.error('Error al crear cupón:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

exports.actualizarCupon = async (req, res) => {
    const { id } = req.params;
    const { codigo, puntos, descuento } = req.body;

    try {
        const cupon = await Cupon.findByPk(id);
        if (!cupon) {
            return res.status(404).json({ error: 'Cupón no encontrado' });
        }

        if (codigo) cupon.codigo = codigo;
        if (puntos) cupon.puntos = puntos;
        if (descuento) cupon.descuento = descuento;

        await cupon.save();
        res.status(200).json({ message: 'Cupón actualizado', cupon });
    } catch (error) {
        console.error('Error al actualizar cupón:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

exports.eliminarCupon = async (req, res) => {
    const { id } = req.params;

    try {
        const cupon = await Cupon.findByPk(id);
        if (!cupon) {
            return res.status(404).json({ error: 'Cupón no encontrado' });
        }

        await cupon.destroy();
        res.status(200).json({ message: 'Cupón eliminado' });
    } catch (error) {
        console.error('Error al eliminar cupón:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};