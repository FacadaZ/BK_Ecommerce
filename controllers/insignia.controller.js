const { Insignia } = require('../models');

exports.crearInsignia = async (req, res) => {
    try {
        const { nombre, descripcion, icono_url } = req.body;
        const nueva = await Insignia.create({ nombre, descripcion, icono_url });
        res.status(201).json(nueva);
    } catch (err) {
        res.status(500).json({ error: 'Error al crear insignia' });
    }
};

exports.obtenerInsignias = async (req, res) => {
    try {
        const insignias = await Insignia.findAll();
        res.json(insignias);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener insignias' });
    }
};