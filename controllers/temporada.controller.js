const { Temporada } = require('../models');

exports.obtenerTemporadaActual = async (req, res) => {
    try {
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth(); 
        const fecha_inicio = new Date(year, month, 1);
        const fecha_fin = new Date(year, month + 1, 0); 

        let temporada = await Temporada.findOne({
            where: {
                fecha_inicio: fecha_inicio.toISOString().slice(0, 10)
            }
        });

        if (!temporada) {
            const nombre = `${fecha_inicio.toLocaleString('es-ES', { month: 'long' })} ${year}`;
            temporada = await Temporada.create({
                nombre,
                fecha_inicio: fecha_inicio.toISOString().slice(0, 10),
                fecha_fin: fecha_fin.toISOString().slice(0, 10)
            });
        }
        res.status(200).json(temporada);
    } catch (error) {
        console.error('Error al obtener la temporada actual:', error);
        res.status(404).json({ error: 'No se pudo obtener la temporada actual.' });
    }
};

exports.obtenerTodasLasTemporadas = async (req, res) => {
    try {
        const temporadas = await Temporada.findAll({ order: [['fecha_inicio', 'DESC']] });
        res.status(200).json(temporadas);
    } catch (error) {
        console.error('Error al obtener todas las temporadas:', error);
        res.status(500).json({ error: 'No se pudieron obtener las temporadas.' });
    }
};